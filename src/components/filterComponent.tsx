import React, { useState, useEffect } from 'react';
import FilterTemplate from './filterTemplate';
import deleteIcon from "../assets/delete.svg";

type Props = {
  filterId: number;
  filtergroup: any;
  setFiltergroup: any
}

const FilterComponent: React.FC<Props> = ({ filterId, filtergroup, setFiltergroup }) => {
  const [filval, setFilval] = useState(filtergroup[filterId][0]);
  const [conval, setConval] = useState(filtergroup[filterId][1]);
  const [crival, setCrival] = useState(filtergroup[filterId][2]);

  useEffect(() => {
    const arr = [...filtergroup];
    arr[filterId][0] = filval;
    arr[filterId][1] = conval;
    arr[filterId][2] = crival;
    setFiltergroup(arr)
  }, [filval, conval, crival])

  useEffect(() => {
    setFilval(filtergroup[filterId][0]);
    setConval(filtergroup[filterId][1]);
    setCrival(filtergroup[filterId][2]);
  }, [filtergroup.length])

  const removeFilter = () => {
    const arr = filtergroup.filter((data: any, i: any) => i !== filterId);
    setFiltergroup(arr);
  }

  return (
    <div className="mt-3">
      <div className='flex justify-start items-end'>
        <FilterTemplate val={setFilval} title="field" filval={filval} fieldval={filval} />
        <FilterTemplate val={setConval} title="condition" filval={filval} fieldval={conval} />
        <FilterTemplate val={setCrival} title="criteria" filval={filval} fieldval={crival} />
        {
          filterId !== 0 ?
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
