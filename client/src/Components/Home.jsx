// import React from 'react'

// const Home = () => {
//   return (
//     <div className='flex flex-col gap-8 items-center justify-center'>
//       <div className='grid grid-rows-2 grid-flow-col gap-4 p-4 max-w-max'>
//           <div className='task-1 flex items-center justify-center flex-col gap-1 w-full'>
//               <div className='h-12 w-52 rounded-md text-base text-white bg-red-400 flex items-center justify-center'>box1</div>
//               <p>lb, ub, refreshTime</p>
//           </div>
//           <div className='task-2 flex items-center justify-center flex-col gap-1 w-full'>
//               <div className='h-12 w-52 rounded-md text-base text-white bg-yellow-400 flex items-center justify-center'>box1</div>
//               <p>lb, ub, refreshTime</p>
//           </div>
//           <div className='task-3 flex items-center justify-center flex-col gap-1 w-full'>
//               <div className='h-12 w-52 rounded-md text-base text-white bg-blue-400 flex items-center justify-center'>box1</div>
//               <p>lb, ub, refreshTime</p>
//           </div>
//           <div className='task-4 flex items-center justify-center flex-col gap-1 w-full'>
//               <div className='h-12 w-52 rounded-md text-base text-white bg-pink-400 flex items-center justify-center'>box1</div>
//               <p>lb, ub, refreshTime</p>
//           </div>
//           <div className='task-5 flex items-center justify-center flex-col gap-1 w-full'>
//               <div className='h-12 w-52 rounded-md text-base text-white bg-green-400 flex items-center justify-center'>box1</div>
//               <p>lb, ub, refreshTime</p>
//           </div>
//           <div className='task-6 flex items-center justify-center flex-col gap-1 w-full'>
//               <div className='h-12 w-52 rounded-md text-base text-white bg-purple-400 flex items-center justify-center'>box1</div>
//               <p>lb, ub, refreshTime</p>
//           </div>
//       </div>

//       <button className='h-10 w-32 p-2 items-center justify-center bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-400 text-white rounded-md'>Stop</button>
//     </div>
    

//   )
// }

// export default Home

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');  

const Home = () => {
  const [boxValues, setBoxValues] = useState([0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    
    socket.on('pythonData', (data) => {
      const num = parseInt(data);

      const newValues = [...boxValues];
      newValues[Math.floor(Math.random() * 6)] = num;
      setBoxValues(newValues);
    });

    return () => {
      socket.off('pythonData');
    };
  }, [boxValues]);

  return (
    <div className='flex flex-col gap-8 items-center justify-center'>
      <div className='grid grid-rows-2 grid-flow-col gap-4 p-4 max-w-max'>
        {boxValues.map((value, index) => (
          <div key={index} className={`task-${index + 1} flex items-center justify-center flex-col gap-1 w-full`}>
            <div className='h-12 w-52 rounded-md text-base text-white bg-blue-400 flex items-center justify-center'>
              {value}
            </div>
            <p>lb, ub, refreshTime</p>
          </div>
        ))}
      </div>
      <button className='h-10 w-32 p-2 items-center justify-center bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800 text-white rounded-md hover:shadow-lg'>
        Stop
      </button>
    </div>
  );
};

export default Home;
