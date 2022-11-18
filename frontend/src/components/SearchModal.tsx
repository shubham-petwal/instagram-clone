import { useEffect, useState, useContext, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Spinner } from "react-bootstrap";
import { Avatar } from "@material-ui/core";
import algoliasearch from "algoliasearch/lite";
import * as dotenv from 'dotenv'
import {
  UserNamePara,
  FullNamePara,
} from "./styledComponents/FollowerModal.style";
import {
  InstantSearch,
  Configure,
  Hits,
  SearchBox,
  Pagination,
} from "react-instantsearch-dom";
import { useNavigate } from "react-router-dom";
import "../styles/FollowerModal.scss";

const searchClient = algoliasearch(
  "UQXI0TPVWJ",
  "841313e007638a6b8bf226ee6a02f35d"
);


function SearchModal(props: any) {
  useEffect(()=>{
    console.log("seach modal env key : ",process.env.REACT_APP_ALGOLIA_APP_ID);
  })
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName="w-md"
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Search User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ minHeight: "400px", maxHeight: "400px" }}>
          <InstantSearch
            searchClient={searchClient}
            indexName="instagram_users"
          >
            <div className="search-panel">
              <Configure hitsPerPage={4} />
              <div className="search-panel">
                <div className="search-panel__results">
                  <SearchBox
                    className="searchbox"
                    translations={{
                      placeholder: "",
                    }}
                  />
                  <Hits
                    hitComponent={(hit) => (
                      <Hit hit={hit} closeModal={props.onHide} />
                    )}
                  />

                  <div className="pagination">
                    <Pagination />
                  </div>
                </div>
              </div>
            </div>
          </InstantSearch>
        </div>
      </Modal.Body>
    </Modal>
  );
}
function Hit(props: any) {
  const navigate = useNavigate();
  return (
    <>

      <Row style={{width:"100%"}}>
        <Col
          sm={2}
          className="p-0"
          style={{ display: "flex", alignItems: "center", width:"20%" }}
        >
          <Avatar
            style={{ width: "40px", height: "40px" }}
            src={props.hit.hit.profileImage}
          />
        </Col>
        <Col sm={8} style={{width:"80%",overflow:"clip" }}>
          <Container>
            <Row style={{ maxHeight: "26px" }}>
              <UserNamePara
                className="p-0"
                onClick={() => {
                  props.closeModal();
                  navigate(`/userProfile/${props.hit.hit.userName}`);
                }}
              >
                {props.hit.hit.userName}
              </UserNamePara>
            </Row>
            <Row style={{ maxHeight: "24px" , overflow:"hidden"}}>
              <FullNamePara className="p-0">
                {props.hit.hit.fullName}
              </FullNamePara>
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  );
}

export default SearchModal;
