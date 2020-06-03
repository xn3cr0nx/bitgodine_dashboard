import cx from "classnames";
import { Theme } from "context";
import React, { SetStateAction, useContext } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

interface Props {
  list: any[];
  index: number;
  itemsPerPage?: number;
  setIndex: React.Dispatch<SetStateAction<number>>;
  classes?: string;
}

const pageLength = 5;

const Navigation: React.FC<Props> = ({ list, itemsPerPage, index, setIndex, classes }) => {
  const { theme } = useContext(Theme);

  return (
    <Pagination
      className={cx("pagination justify-content-center pagination-lg mt-5", classes)}
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
          <i className="fa fa-angle-left" />
          <span className="sr-only">First</span>
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          aria-label="Previous"
          onClick={(e): void => {
            e.preventDefault();
            if (!index) return;
            setIndex(index - 1);
          }}>
          <i className="fa fa-angle-left" />
          <span className="sr-only">Previous</span>
        </PaginationLink>
      </PaginationItem>
      {Array.from(Array(Math.ceil(list.length / (itemsPerPage ?? pageLength))).keys()).map((n, i) => {
        if (
          (index > 2 && i < index - 2) ||
          (index < Math.ceil(list.length / (itemsPerPage ?? pageLength)) - 1 && i > index + 2)
        )
          return;
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
          aria-label="Next"
          onClick={(e): void => {
            e.preventDefault();
            if (index === Math.ceil(list.length / (itemsPerPage ?? pageLength)) - 1) return;
            setIndex(index + 1);
          }}>
          <i className="fa fa-angle-right" />
          <span className="sr-only">Next</span>
        </PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          aria-label="Last"
          onClick={(e): void => {
            e.preventDefault();
            if (index === Math.ceil(list.length / (itemsPerPage ?? pageLength)) - 1) return;
            setIndex(Math.ceil(list.length / (itemsPerPage ?? pageLength)) - 1);
          }}>
          <i className="fa fa-angle-right" />
          <i className="fa fa-angle-right" />
          <span className="sr-only">Last</span>
        </PaginationLink>
      </PaginationItem>
    </Pagination>
  );
};

const Paginate: React.FC<Props> = ({ list, itemsPerPage, index, setIndex, classes }) => {
  return (
    <>
      <Navigation list={list} index={index} setIndex={setIndex} classes={classes} itemsPerPage={itemsPerPage} />
      {list.slice(
        (itemsPerPage ?? pageLength) * index,
        (itemsPerPage ?? pageLength) * index + (itemsPerPage ?? pageLength),
      )}
      <Navigation list={list} index={index} setIndex={setIndex} itemsPerPage={itemsPerPage} />
    </>
  );
};

export default Paginate;
