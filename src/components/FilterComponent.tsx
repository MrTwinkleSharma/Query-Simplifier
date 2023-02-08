import { FC, useState,useEffect } from 'react';
import FilterTemplate from './FilterTemplate';
import deleteIcon from "../assets/delete.svg";

type Props = {
  filterno: number;
  filtergroup:any;
  setFiltergroup: any
}

const FilterComponent: FC<Props> = ({ filterno,filtergroup,setFiltergroup }) => {
  const [filval,setFilval]=useState(filtergroup[filterno][0]);
  const [conval,setConval]=useState(filtergroup[filterno][1]);
  const [crival,setCrival]=useState(filtergroup[filterno][2]);

  useEffect(()=>{
    const arr = [...filtergroup];
    arr[filterno][0]=filval;
    arr[filterno][1]=conval;
    arr[filterno][2]=crival;
    setFiltergroup(arr)
  },[filval,conval,crival])

  useEffect(()=>{
    setFilval(filtergroup[filterno][0]);
    setConval(filtergroup[filterno][1]);
    setCrival(filtergroup[filterno][2]);
  },[filtergroup.length])

  const removeFilter = () => {
    const arr=filtergroup.filter((data:any,i:any)=>i!==filterno);
    setFiltergroup(arr);
  }

  return (
    <div className="mt-3">
      <div className='flex justify-start items-end'>
        <FilterTemplate val={setFilval} title="field" filval={filval} fieldval={filval}/>
        <FilterTemplate val={setConval} title="condition" filval={filval} fieldval={conval}/>
        <FilterTemplate val={setCrival} title="criteria" filval={filval} fieldval={crival}/>
        {
          filterno !== 0 ?
            <div onClick={removeFilter} className='border-[1px] border-[#404348] bg-[rgba(255,255,255,0.1)] rounded-[4px] flex items-center justify-center cursor-pointer h-[35px] w-[35px]'>
              <img src={deleteIcon} alt="" className='h-[24px] w-[24px]' />
            </div>
            : <></>
        }
      </div>
    </div>
  );
}

export default FilterComponent;
