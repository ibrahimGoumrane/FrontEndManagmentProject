interface dropDownItemsProps {
  name: string;
  status: string;
}

const DropDownItems = ({ name, status }: dropDownItemsProps) => {
  return (
    <li
      key={0}
      className="h-16 w-[16vw] pl-2 pr-2 items-center mx-auto  bg-purple-400 rounded-sm flex justify-start"
    >
      <span className=" font-mono font-extrabold text-xl text-white   capitalize">
        {name}
      </span>
      <span className="capitalize pl-1 font-mono font-extrabold text-md text-white ">
        : {status}
      </span>
    </li>
  );
};

export default DropDownItems;
