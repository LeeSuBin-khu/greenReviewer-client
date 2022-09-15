import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios, { AxiosResponse } from 'axios';
import { useParams } from "react-router-dom";

import { useFetch } from "../../hooks/useFetch";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Data {
  id: number;
  num: number;
}

const Statistics = ( props: { reviewUpdate: number }) => {
  const [typeNumList, setTypeNumList] = useState<Data []>([]);
  const typeList = useFetch("checklists");
  const params = useParams();

  useEffect( () => {
    const fetchApi = async () => {
      const response: AxiosResponse<any> = await axios.get(`/product/detail/${params.id}`);
      setTypeNumList(response.data.checkList);
    };
    fetchApi();
  }, [props.reviewUpdate]);

  const data = {
    labels: typeList.map( type => type.name ),
    datasets: [
      {
        data: typeNumList.map( type => type.num ),
        backgroundColor: [
          '#ECEC84',
          '#FFB69B',
          '#A299CA',
          '#7CCAAE',
        ],
      },
    ],
  };

  // 통계 표 부분
  return (
    <div>
      <div style={{ position: 'relative', width: '550px', marginTop: '40px' }}>
        <Doughnut data={data} />
      </div>
    </div>
  );
}

export default Statistics;