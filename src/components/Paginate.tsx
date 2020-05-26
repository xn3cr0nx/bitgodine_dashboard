import cx from "classnames";
import { Theme } from "context";
import React, { SetStateAction, useContext } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

interface Props {
  list: any[];
  index: number;
  setIndex: React.Dispatch<SetStateAction<number>>;
}

const pageLength = 5;

const Navigation: React.FC<Props> = ({ list, index, setIndex }) => {
  const { theme } = useContext(Theme);

  return (
    <Pagination
      className="pagination justify-content-center pagination-lg mt-5"
      listClassName="justify-content-center pagination-lg">
      <PaginationItem>
        <PaginationLink
          aria-label="First"
          onClick={(e): void => {
            e.preventDefault();
            if (!index) return;
            // setIndex(index - 1);
            setIndex(0);
          }}>
          <i className="fa fa-angle-left" />
          <span className="sr-only">First</span>
        </PaginationLink>
      </PaginationItem>
      {Array.from(Array(Math.ceil(list.length / pageLength)).keys()).map((n, i) => {
        if ((index > 2 && i < index - 2) || (index < Math.ceil(list.length / pageLength) - 1 && i > index + 2)) return;
        return (
          <PaginationItem key={i}>
            <PaginationLink
              className={cx({ [`${theme.bg} ${theme.text}`]: index === i })}
              onClick={(e): void => {
                e.preventDefault();
                setIndex(i);
              }}>
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        );
      })}
      <PaginationItem>
        <PaginationLink
          aria-label="Last"
          onClick={(e): void => {
            e.preventDefault();
            if (index === Math.ceil(list.length / pageLength) - 1) return;
            // setIndex(index + 1);
            setIndex(Math.ceil(list.length / pageLength) - 1);
          }}>
          <i className="fa fa-angle-right" />
          <span className="sr-only">Last</span>
        </PaginationLink>
      </PaginationItem>
    </Pagination>
  );
};

const Paginate: React.FC<Props> = ({ list, index, setIndex }) => {
  return (
    <>
      <Navigation list={list} index={index} setIndex={setIndex} />
      {list.slice(pageLength * index, pageLength * index + 5)}
      <Navigation list={list} index={index} setIndex={setIndex} />
    </>
  );
};

export default Paginate;
