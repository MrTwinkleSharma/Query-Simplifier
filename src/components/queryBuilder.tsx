import { FC, useEffect, useState } from 'react';
import crossImg from "../assets/cross.svg";
import GroupFilter from './groupFilter';

type Props = {
  setPopup: any;
}

const QueryBuilder: FC<Props> = ({ setPopup }) => {

  const [groups, setGroups] = useState([""]);
  const [groupsobj, setGroupsobj] = useState([[{}]]);
  const [more, setMore] = useState(false);
  const [resultString, setResultString] = useState("");

  useEffect(() => {
    if (groups.join(', ') !== '""')
      setResultString(groups.join(', '));
  }, [groups])

  const finishClick = (e: any) => {
    e.preventDefault();

    if (resultString !== "") {
      let ruleobj = [];

      for (let i = 0; i < groupsobj.length; i++) {
        let tempobj = { "ruleGroup": [{}] };
        for (let j = 0; j < groupsobj[i].length; j++) {
          if (j === 0)
            tempobj.ruleGroup[0] = groupsobj[i][j];
          else
            tempobj.ruleGroup.push(groupsobj[i][j]);
        }
        ruleobj.push(tempobj);
      }

      if (sessionStorage.getItem('queries') !== null) {
        let arr = [...JSON.parse(sessionStorage.getItem('queries') as string)];
        let arrobj = [...JSON.parse(sessionStorage.getItem('queriesObject') as string)];
        arr.push(resultString);
        arrobj.push(ruleobj);
        sessionStorage.setItem('queries', JSON.stringify(arr));
        sessionStorage.setItem('queriesObject', JSON.stringify(arrobj));
      } else {
        sessionStorage.setItem('queries', JSON.stringify([resultString]));
        sessionStorage.setItem('queriesObject', JSON.stringify(ruleobj));
      }
      console.log(ruleobj);
    }
    setPopup(false);
  }

  return (
    <div className="bg-[rgba(0,0,0,0.2)] absolute top-0 left-0 h-[100vh] w-[100vw]">
      <div className='bg-[#1D2025] rounded-[4px] shadow-[0px_4px_16px_rgba(0,0,0,0.1)] h-[80vh] w-[70vw] mx-auto mt-[10vh] mb-[10vh] relative'>
        <div className='bg-[#5C61F0] py-6 px-8 rounded-t-[4px] relative'>
          <p className='text-[white] font-[500] text-[16px]'>
            {
              resultString === "" ?
                <>Create tag and query</>
                :
                <>Build your query</>
            }
          </p>
          {
            resultString === "" ?
              <p className='text-[#A5B4FC] font-[400] text-[14px] mt-1'>
                The query you build will be saved in your active view
              </p>
              :
              <div className='flex items-center leading-7'>
                <div className={`bg-[#4338CA] rounded-[4px] p-2 text-[white] font-[700] text-[14px] mt-3 w-[85%] ${more === false ? "truncate" : ""}`}>
                  Query: {
                    resultString.length > 120 ?
                      more === false ?
                        `${resultString.substring(0, 150)}...`
                        :
                        resultString
                      :
                      resultString
                  }
                </div>
                {
                  resultString.length > 120 ?
                    more === false ?
                      <div onClick={() => setMore(true)} className='text-[white] font-[500] text-[16px] cursor-pointer ml-4 mt-2'>View More...</div>
                      :
                      <div onClick={() => setMore(false)} className='text-[white] font-[500] text-[16px] cursor-pointer ml-4 mt-2'>View Less</div>
                    : <></>
                }
              </div>
          }
          <div onClick={() => setPopup(false)} className='absolute bg-[#4338CA] rounded-[6px] h-6 w-6 right-4 top-[20px] cursor-pointer flex items-center justify-center'>
            <img src={crossImg} alt='' />
          </div>
        </div>
        <div className='overflow-y-auto h-[35rem] py-8'>
          <div className='px-6'>
            {
              groups.map((data, i) => (
                <GroupFilter key={i} groupId={i} groups={groups} setGroups={setGroups} groupsobj={groupsobj} setGroupsobj={setGroupsobj} />
              ))
            }
            <div onClick={() => { setGroups(groups => [...groups, ""]) }} className='relative inline-block cursor-pointer bg-[#4F46E5] rounded-[6px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-4 py-[9px] text-white text-[14px]'>
              + Add new group filter
              <div className='absolute top-[-16px] left-[30px] h-[16px] w-[2px] bg-[#4F4F4F]'></div>
            </div>
          </div>
        </div>

        <div className='absolute left-0 bottom-[16px] px-6 flex items-center justify-between w-[100%]'>
          <div onClick={() => setPopup(false)} className='bg-[#6D7175] text-[white] text-[14px] rounded-[6px] px-4 py-2 cursor-pointer'>
            Cancel
          </div>
          <div onClick={(e) => finishClick(e)} className='bg-[#4F46E5] text-[white] text-[14px] rounded-[6px] px-4 py-2 cursor-pointer'>
            Finish
          </div>
        </div>
      </div>
    </div>
  );
}

export default QueryBuilder;
