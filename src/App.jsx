import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

const StyledApp = styled.div`
  /* background-color: orangered; */
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Row type="horizontal">
            <Heading as="h1">The wild oasis</Heading>

            <div>
              <Heading as="h2">Check in and out</Heading>

              <Button onClick={() => alert("check")}>check in</Button>
              <Button
                variation="secondary"
                size="small"
                onClick={() => alert("check")}
              >
                check in
              </Button>
            </div>
          </Row>

          <Row>
            <Heading as="h3">Form</Heading>
            <form>
              <Input
                max={20}
                type="number"
                placeholder="number of guests"
              ></Input>
              <Input
                max={20}
                type="number"
                placeholder="number of guests"
              ></Input>
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
