import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios, { AxiosResponse } from 'axios';

import { useFetch } from "../../hooks/useFetch";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Data {
  id: number;
  num: number;
}

interface Id {
  productId : number
}

const Statistics = ( props: Id ) => {
  const [typeNumList, setTypeNumList] = useState<Data []>([]);
  const typeList = useFetch("checklists");

  useEffect( () => {
    const fetchApi = async () => {
      const response: AxiosResponse<any> = await axios.get(`/product/detail/${props.productId}`);
      setTypeNumList(response.data.checkList);
    };
    fetchApi();
  }, []);

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

  return (
    <div>
      <div style={{ position: 'relative', width: '550px', marginTop: '40px' }}>
        <Doughnut data={data} />
      </div>
    </div>
  );
}

export default Statistics;