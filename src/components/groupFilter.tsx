import { FC, useEffect, useState } from 'react';
import infoIcon from '../assets/info.svg'
import FilterComponent from './FilterComponent';

type Props = {
    groupno: number;
    groups: any;
    setGroups: any;
    groupsobj: any;
    setGroupsobj: any;
}

const GroupFilter: FC<Props> = ({ groupno, groups, setGroups, groupsobj, setGroupsobj }) => {

    const [condition, setCondition] = useState("AND");
    const [filtergroup, setFiltergroup] = useState([["", "", ""]]);

    const formatFilters = (fil: any) => {
        let temp = "";
        if (fil[0] !== "") {
            temp += "(field." + fil[0] + ") ";
        }
        if (fil[1] !== "") {
            switch (fil[1]) {
                case "Equals": temp += "==";
                    break;
                case 'Does not equal': temp += "!=";
                    break;
                case 'Like': temp += "=";
                    break;
                case 'Not like': temp += "!";
                    break;
                case 'Is Empty': temp += "()";
                    break;
                case 'Is': temp += "!";
                    break;
                case 'Is not': temp += "~";
                    break;
            }
        }
        if (fil[2] !== "") {
            temp += ' \\"' + fil[2] + '"\\';
        }
        return `"${temp}"`;
    }

    const formatFiltersobj = (fil: any) => {
        let tempobj = { "field": "", "condition": "", "value": "" };
        if (fil[0] !== "") {
            tempobj.field = fil[0];
        }
        if (fil[1] !== "") {
            tempobj.condition = fil[1];
        }
        if (fil[2] !== "") {
            tempobj.value = fil[2];
        }
        return tempobj;
    }

    useEffect(() => {
        const arr = [...groups];
        const arrobj = [...groupsobj];
        if (filtergroup.length === 1) {
            arr[groupno] = formatFilters(filtergroup[0]);
            arrobj[groupno] = [formatFiltersobj(filtergroup[0])];
        }
        else {
            const temp = [];
            const tempobj = [];
            for (let i = 0; i < filtergroup.length; i++) {
                temp.push(formatFilters(filtergroup[i]))
                tempobj.push(formatFiltersobj(filtergroup[i]));
            }
            if (condition === "AND") {
                arr[groupno] = temp.join(' && ');
            } else
                arr[groupno] = temp.join(' || ');
            arrobj[groupno] = tempobj;
        }
        setGroups(arr);
        setGroupsobj(arrobj);
    }, [filtergroup, condition])

    return (
        <div className="bg-[#282B30] rounded-[4px] border-[1px] border-[#404348] p-4 mb-4">
            {
                filtergroup.length > 1 ?
                    <div className='flex text-[white] text-[16px] mb-[30px]'>
                        <div onClick={() => { setCondition("AND") }} className={`${condition === "OR" ? "bg-[rgba(255,255,255,0.05)]" : "bg-[#5C61F0]"} rounded-l-[4px] shadow-[0px_2px_3px_rgba(0,0,0,0.05)] py-1 pl-3 pr-2 cursor-pointer`}>
                            AND
                        </div>
                        <div onClick={() => { setCondition("OR") }} className={`${condition === "OR" ? "bg-[#5C61F0]" : "bg-[rgba(255,255,255,0.05)]"} rounded-r-[4px] border-[1px] border-[#404348] py-1 pl-2 pr-3 cursor-pointer`}>
                            OR
                        </div>
                        <img src={infoIcon} className="ml-[10px]" alt="" />
                    </div>
                    : <></>
            }
            {
                filtergroup.map((data, i) => (
                    <FilterComponent key={i} filterno={i} filtergroup={filtergroup} setFiltergroup={setFiltergroup} />
                ))
            }
            <div onClick={() => { setFiltergroup(filtergroup => [...filtergroup, ["", "", ""]]) }} className='inline-block cursor-pointer bg-[#4F46E5] rounded-[6px] mt-4 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] px-4 py-[9px] text-white text-[14px]'>
                + Add filter
            </div>
        </div>
    );
}

export default GroupFilter;
