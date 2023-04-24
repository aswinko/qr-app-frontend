import { Tabs } from "flowbite-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../Actions";
import { NavLink } from "react-router-dom";

const Tab = (props) => {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        // <Tabs.Item key={category.name} title={category.name}>
        //   {category.name}
        // </Tabs.Item>
        <li className="mr-2" key={category.name}>
        <NavLink
          to={"/" + category.slug}
          className="inline-block p-2 md:p-4 border-b-2 border-transparent rounded-t-lg text-gray-600 dark:hover:text-gray-500 hover:border-gray-300"
        >
          {category.name}
        </NavLink>
      </li>
      );
    }

    return myCategories;
  };

  return (
    // <div className="px-20 pt-6">
    //   <Tabs.Group className="flex justify-end gap-4 mx-4" aria-label="Tabs with underline" style="underline">
    //     <Tabs.Item active={true} title="All">{children}</Tabs.Item>
    //     {renderCategories(category?.categories)}
    //   </Tabs.Group>
    // </div>
    <div className="lg:px-24 pt-6 ">
      <div className="text-sm lg:mx-4 shadow-lg font-small md:font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-400">
        <ul className="flex flex-wrap justify-center md:justify-end -mb-px">
          <li className="mr-2">
            <NavLink
              to="/"
              className="inline-block p-2 md:p-4 border-b-2 border-transparent rounded-t-lg text-gray-600 dark:hover:text-gray-500 hover:border-gray-300"
            >
              All
            </NavLink>
          </li>
          {renderCategories(category?.categories)}
        </ul>
      </div>
    </div>
  );
};

export default Tab;
