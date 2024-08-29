interface BreadcrumbProps {
  content: string;
}

const BreadcrumbButton: React.FC<BreadcrumbProps> = ({ content }) => {
  return (
    <div className="nav breadcrumb relative ml-[-15px] flex items-center bg-accent px-4 py-2 font-semibold text-white">
      <span className="pl-[15px]"> {content}</span>
      <div className="absolute right-[-14px] h-0 w-0 border-b-[20px] border-l-[15px] border-t-[20px] border-b-transparent border-l-accent border-t-transparent"></div>
      </div>
  );
};

export default BreadcrumbButton;
