export default function AccountSidebarView(props: {
  username: string;
  festivalName: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-indigo-400">
        {props.festivalName}
      </h1>
      <h2 className="text-xl font-bold text-gray-900 dark:text-indigo-400">
        @{props.username}
      </h2>
    </div>
  );
}
