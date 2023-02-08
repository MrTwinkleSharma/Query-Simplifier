import { FC, useEffect, useState } from 'react';
import arrow from "../assets/downArrow.svg";
import { fieldData, condition,criteria } from "../data.js";

type Props = {
  val: any;
  title: string;
  filval: string;
  fieldval:string;
}

type Ctype = {
    Theme:string[];
    "Sub-Theme":string[];
    Reason:string[];
    Language:string[];
    Source:string[];
    Rating:string[];
    "Time Period":string[];
    "Customer ID":string[];
}

const FilterTemplate: FC<Props> = ({ val, title, filval,fieldval }) => {

  const [filterValue, setFilterValue] = useState(fieldval);
  const [filterClick, setFilterClick] = useState(false);

  useEffect(() => {
    val(filterValue);
  }, [filterValue])

  useEffect(()=>{
    if(title==="criteria")
      setFilterValue("");
  },[filval])

  useEffect(()=>{
    setFilterValue(fieldval)
  },[fieldval])

  return (
    <div className='w-[28%] text-[white] text-[12px] relative mr-4'>
      <p className='mb-2 capitalize'>{title}</p>
      <div onClick={() => { setFilterClick(!filterClick) }} className='cursor-pointer bg-[rgba(255,255,255,0.05)] rounded-[4px] border-[1px] border-[#404348] text-[14px] py-[6.5px] px-4 cursor-pointer flex justify-between items-center'>
        {
          filterValue === "" ?
            <div className='text-[rgba(255,255,255,0.5)] text-[14px]'>
              Select {title}
            </div>
            :
            filterValue
        }
        <img src={arrow} alt="" />
      </div>
      {
        filterClick ?
          <div className='leading-7 absolute w-[100%] bg-[#282B30] border-[1px] border-[#404348] rounded-[4px] mt-2 z-[10] pl-[9px] pr-[20px] py-4'>
            {
              title === "field" ?
                fieldData!.map((d, i) => (
                  <>
                    <div key={i} className='text-[12px] text-[rgba(255,255,255,0.5)] font-[600] tracking-[2.5px] pl-[7px] uppercase'>{d.heading}</div>
                    {
                      d.fields.map((v: string, j: number) => (
                        <div key={j} onClick={() => { setFilterValue(v); setFilterClick(!filterClick) }} className='text-[14px] text-[white] font-[400] pl-[7px] hover:bg-[rgba(196,196,196,0.1)] hover:rounded-[4px] cursor-pointer pt-[1px] pb-[2px]'>
                          {v}
                        </div>
                      ))
                    }
                  </>
                ))
                :
                title === "condition" ?
                  condition.map((c, i) => (
                    <div key={i} onClick={() => { setFilterValue(c); setFilterClick(!filterClick) }} className='text-[14px] text-[white] font-[400] pl-[7px] hover:bg-[rgba(196,196,196,0.1)] hover:rounded-[4px] cursor-pointer pt-[1px] pb-[2px]'>
                      {c}
                    </div>
                  ))
                  :
                  filval !== "" ?
                    criteria[`${filval}` as keyof Ctype].map((d:string, i:number) => (
                      <div key={i} onClick={() => { setFilterValue(d); setFilterClick(!filterClick) }} className='text-[14px] text-[white] font-[400] pl-[7px] hover:bg-[rgba(196,196,196,0.1)] hover:rounded-[4px] cursor-pointer pt-[1px] pb-[2px]'>
                        {d}
                      </div>
                    ))
                    :
                    <></>
            }
          </div>
          : <></>
      }
    </div>
  );
}

export default FilterTemplate;
