import classnames from "classnames";
import React, { useState } from "react";
import { FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";

interface SearchProps {
  placeholder?: string;
  set: (value: string) => void;
}

const Inputs: React.FC<SearchProps> = ({ placeholder, set }) => {
  const [search, setSearch] = useState(false);

  return (
    <FormGroup
      className={classnames({
        focused: search,
      })}>
      <InputGroup className="input-group-alternative mb-2">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="fa fa-bitcoin" />
          </InputGroupText>
        </InputGroupAddon>
        <Input
          placeholder={placeholder}
          type="text"
          onFocus={(): void => setSearch(true)}
          onBlur={(): void => setSearch(false)}
          onChange={(e): void => set(e.target.value)}
        />
        <InputGroupAddon addonType="append">
          <InputGroupText>
            <i className="fa fa-search" />
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </FormGroup>
  );
};

export default Inputs;
