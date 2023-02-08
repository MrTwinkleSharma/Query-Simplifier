import { useEffect, useState } from 'react';
import QueryPopup from './components/queryPopup';
import companyLogo from "./assets/companyLogo.svg";
import chart from "./assets/chart.svg";
import chartDark from "./assets/chartDark.svg";
import settings from "./assets/settings.svg";
import avatar from "./assets/avatars.svg";
import filter from "./assets/filter.svg";
import search from "./assets/search.svg";
import download from "./assets/download.svg";
import calendar from "./assets/calendar.svg";

function App() {
  const [popup, setPopup] = useState(false);
  const [queries, setQueries] = useState([]);

  useEffect(()=>{
    if(sessionStorage.getItem('queries')!==null){
      setQueries(JSON.parse(sessionStorage.getItem('queries') as string));
    }
  },[popup])

  return (
    <div className="bg-[#1D2025] min-h-screen">
      <div className='bg-[#292C33] py-5 px-24 flex items-center justify-between'>
        <div className='flex items-center justify-start'>
          <img src={companyLogo} className="mr-16" alt="" />
          <div className='bg-[rgba(255,255,255,0.05)] rounded-[37px] mx-[6px] py-[6px] px-[8px] flex'>
            <img src={chart} alt=""/>
            <p className='text-[white] text-[16px] font-[500] ml-2'>
              Themetic Analysis
            </p>
          </div>
          <div className='rounded-[37px] mx-[6px] py-[6px] px-[8px] flex'>
            <img src={chartDark} alt=""/>
            <p className='text-[#8B8C8C] text-[16px] font-[500] ml-2'>
              Nascent Themes
            </p>
          </div>
          <div className='rounded-[37px] mx-[6px] py-[6px] px-[8px] flex'>
            <img src={settings} alt=""/>
            <p className='text-[#8B8C8C] text-[16px] font-[500] ml-2'>
              settings
            </p>
          </div>
        </div>
        <img src={avatar} className="mr-6" alt=""/>
      </div>
      <div className='flex pt-8 pl-24 pr-[160px]'>
        <div className='w-[15%] pt-[30px]'>
          <div className='flex items-center justify-start'>
            <img src={filter} alt=""/>
            <p className='text-[white] text-[16px] font-[500] ml-1'>
              Build your query
            </p>
          </div>
          <p className='text-[rgba(255,255,255,0.4)] text-[12px] font-[500] mt-2'>
            Narrow your search further by adding some filters.
          </p>
          <div onClick={() => setPopup(true)} className='bg-[#5C61F0] text-[white] text-[16px] rounded-[4px] px-6 py-2 mt-4 inline-block cursor-pointer'>
            Build Query
          </div>
        </div>
        <div className='pl-10'>
          <div className='flex'>
            <div className='relative'>
              <img src={search} className="absolute left-[10px] top-[10px]" alt="" />
              <input
                type="text"
                placeholder='Search for product feedback'
                className='bg-[rgba(255,255,255,0.05)] text-[14px] rounded-[4px] border-[1px] border-[#404348] outline-none text-[#8B8C8C] py-[10px] pl-11 pr-6 w-[300px]'
              />
            </div>
            <div className='ml-5 bg-[rgba(255,255,255,0.05)] rounded-[4px] border-[1px] border-[#404348] py-[10px] px-6 cursor-pointer flex'>
              <img src={download} className="mr-2" alt="" />
              <div className='text-[14px] text-[white]'>
                Export Feedback
              </div>
            </div>
            <div className='ml-5 bg-[#5C61F0] rounded-[4px] py-[10px] px-6 cursor-pointer'>
              <div className='text-[14px] text-[white]'>
                View Feedback
              </div>
            </div>
            <div className='ml-5 bg-[rgba(255,255,255,0.05)] rounded-[4px] border-[1px] border-[#404348] py-[10px] px-6 cursor-pointer flex'>
              <img src={calendar} className="mr-2" alt=""/>
              <div className='text-[14px] text-[white]'>
                July 28, 2020 - Oct 28, 2020
              </div>
            </div>
          </div>
          {
            queries.length>0 ?
              queries.map((q,i)=>(
                <div key={i} className='bg-[#282B30] rounded-[4px] border-[1px] border-[#404348] p-4 mt-4 mb-6'>
                  <div className='text-[white] font-[500] text-[16px]'>Query: {q}</div>
                </div>
              ))
              :<></>
          }
        </div>
      </div>
      {
        popup ?
          <QueryPopup setPopup={setPopup} />
          :
          <></>
      }
    </div>
  );
}

export default App;
