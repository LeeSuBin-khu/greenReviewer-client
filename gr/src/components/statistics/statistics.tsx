/*
 * Copyright 2022 KHUGREEN (https://github.com/KHUGREEN)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import axios, { AxiosResponse } from "axios";
import { useParams } from "react-router-dom";

import { useFetch } from "../../hooks/useFetch";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Data {
  id: number;
  num: number;
}

const Statistics = (props: { reviewUpdate: number }) => {
  const [typeNumList, setTypeNumList] = useState<Data[]>([]);
  const typeList = useFetch("checklists");
  const params = useParams();

  useEffect(() => {
    const fetchApi = async () => {
      const response: AxiosResponse<any> = await axios.get(
        `/product/detail/${params.id}`
      );
      setTypeNumList(response.data.checkList);
    };
    fetchApi();
  }, [props.reviewUpdate]);

  const data = {
    labels: typeList.map((type) => type.name),
    datasets: [
      {
        data: typeNumList.map((type) => type.num),
        backgroundColor: ["#ECEC84", "#FFB69B", "#A299CA", "#7CCAAE"],
      },
    ],
  };

  // 통계 표 부분
  return (
    <div>
      <div style={{ position: "relative", width: "550px", marginTop: "40px" }}>
        <Doughnut data={data} />
      </div>
    </div>
  );
};

export default Statistics;
