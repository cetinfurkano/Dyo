import React, { useMemo, useEffect, useState } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import { COLUMNS } from "./TeacherTableColumns";
import GlobalFilter from "./GlobalFilter";

import "./../../assets/css/distributor/distTable.css";
import FormModal from "./FormModal";
import TeacherInput from "./TeacherInput";
import DistOperations from "../../logics/Distributor/DistOperations";

function DistributorTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [pages, setPages] = useState([]);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => teachers, [teachers]);

  const [show, setModalShow] = useState(false);

  useEffect(() => {
      DistOperations.getAllTeachers((data) => {
          setTeachers(data);
          setPages(setPaginationPages());
      });
  }, [])

  useEffect(() => {
    setPages(setPaginationPages());
  }, [teachers])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 5 },
    },
    useGlobalFilter,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;
  const setPaginationPages = () => {
    const pages = [];
    let current = pageIndex + 1;

    let beforePages = current - 1;
    let afterPages = current + 1;
    let activeLi = "";

    if (current > 2 && current >= 6) {
      pages.push({
        liClass: "numb",
        content: 1,
      });
      if (current > 3) {
        pages.push({
          liClass: "dots",
          content: "...",
        });
      }
    }

    if (current == pageCount) {
      beforePages -= 2;
    } else if (current == pageCount - 1) {
      beforePages -= 1;
    }

    if (current == 1) {
      afterPages += 2;
    } else if (current == 2) {
      afterPages += 1;
    }

    for (let pageLength = beforePages; pageLength <= afterPages; pageLength++) {
      if (pageLength > pageCount) {
        continue;
      }
      if (pageLength == 0) {
        pageLength += 1;
      }

      if (current == pageLength) {
        activeLi = "active";
      } else {
        activeLi = "";
      }
      pages.push({
        liClass: "numb " + activeLi,
        content: pageLength,
      });
    }
    if (current < pageCount - 1) {
      if (current < pageCount - 2) {
        pages.push({
          liClass: "dots",
          content: "...",
        });
      }
      if (!include(pages, pageCount)) {
        pages.push({
          liClass: "numb",
          content: pageCount,
        });
      }
    }
    return pages;
  };
  const include = (array, numb) => {
    var found = false;
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if (element.content == numb) {
        found = true;
        break;
      }
    }
    return found;
  };

  return (
    <div className="DistTable">
      <div className="container p-30 mt-5">
        <div className="row">
          <div className="col-md-12 main-datatable">
            <div className="card_body">
              <div className="row d-flex">
                <div className="col-sm-4 createSegment">
                  <a
                    className="btn dim_button create_new"
                    onClick={(e) => setModalShow(true)}
                  >
                    <span className="glyphicon glyphicon-plus"></span> Yeni
                    oluştur
                  </a>
                </div>
                <GlobalFilter
                  filter={globalFilter}
                  setFilter={setGlobalFilter}
                />
              </div>
              <div className="overflow-x">
                <table
                  {...getTableProps()}
                  style={{ width: "100%" }}
                  id="filtertable"
                  className="table cust-datatable dataTable no-footer"
                >
                  <thead>
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th
                            {...column.getHeaderProps()}
                            style={{ minWidth: "100px" }}
                            className="sorting"
                          >
                            {column.render("Header")}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => {
                            return (
                              <td {...cell.getCellProps()}>
                                {cell.render("Cell")}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    {footerGroups.map((footerGroup) => (
                      <tr {...footerGroup.getFooterGroupProps()}>
                        {footerGroup.headers.map((column) => (
                          <td
                            {...column.getFooterProps()}
                            style={{ minWidth: "100px" }}
                          >
                            {column.render("Footer")}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tfoot>
                </table>
                <div className="pagination">
                  <ul>
                    <li
                      className="btn prev"
                      style={{
                        visibility: !canPreviousPage ? "hidden" : "visible",
                      }}
                      onClick={(e) => previousPage()}
                    >
                      <span>
                        <i className="fa fa-angle-left"> Geri</i>
                      </span>
                    </li>
                    {/* {pages && pages.map((page, index) => (
                      <li
                        key={index}
                        className={page.liClass}
                        onClick={(e) => {
                          console.log("content: " + page.content);
                          gotoPage(page.content - 1);
                          setPaginationPages();
                        }}
                      >
                        <span>{page.content}</span>
                      </li>
                    ))} */}
                    <li
                      className="btn next"
                      style={{
                        visibility: !canNextPage ? "hidden" : "visible",
                      }}
                      onClick={(e) => nextPage()}
                    >
                      İleri{" "}
                      <span>
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </li>
                  </ul>
                </div>
                <FormModal show={show} setModalShow={setModalShow}>
                  <TeacherInput
                    setModalShow={setModalShow}
                    setTeachers={setTeachers}
                  />
                </FormModal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DistributorTeachers;
