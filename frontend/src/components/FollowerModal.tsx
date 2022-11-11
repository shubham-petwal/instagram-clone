import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { Avatar } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import {
  FollowBtn,
  FullNamePara,
  UserNamePara,
  LoadingDiv,
} from "./styledComponents/FollowerModal.style";

import "../styles/FollowerModal.scss";

interface FollowersInterface {
  fullName: string;
  profileImage: string;
  userName: string;
  userId: string;
  document_id: string;
}

function UserDetails(props: any) {
  return (
    <>
      <Row style={{ minHeight: "50px", padding: "4px 0" }}>
        <Col
          sm={1}
          className="p-0"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Avatar
            style={{ width: "35px", height: "35px" }}
            src={props.profileImage}
          />
        </Col>
        <Col sm={7}>
          <Container>
            <Row style={{ maxHeight: "24px" }}>
              <UserNamePara className="p-0">{props.userName}</UserNamePara>
            </Row>
            <Row style={{ maxHeight: "22px" }}>
              <FullNamePara className="p-0">{props.fullName}</FullNamePara>
            </Row>
          </Container>
        </Col>
        <Col
          sm={4}
          className="p-0"
          style={{ margin: "0px", display: "flex", alignItems: "center" }}
        >
          <FollowBtn>Follow</FollowBtn>
        </Col>
      </Row>
    </>
  );
}

function FollowerModal(props: any) {
  const [followers, setFollowers] = useState<FollowersInterface[]>([]);
  const [lastDoc, setLastDoc] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const userId = props.userId;
    const method = props.method;
    setFollowers([]);
    axios
      .get(`http://localhost:90/${props.method}/${userId}`)
      .then((response) => {
        setFollowers(() => {
          return [...response.data.data];
        });
        setLastDoc(response.data.lastDocId);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.show]);

  async function handleLoaderClick() {
    const userId = props.userId;
    const method = props.method;
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:90/${method}/${userId}?lastDocId=${lastDoc}`
      );
      setFollowers((prev) => {
        return [...prev, ...response.data.data];
      });
      setLoading(false);
      setLastDoc(response.data.lastDocId);
    } catch (error) {
      setLoading(false);
      console.log("followerModal : ", error);
    }
  }

  return (
    <Modal
      {...props}
      aria-labelledby="example-custom-modal-styling-title"
      centered
      dialogClassName="w-md"
      scrollable
    >
      <Modal.Header closeButton style={{ padding: "8px 15px" }}>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ margin: "0 0 0 35%", fontSize: "18px" }}
        >
          {props.method}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ minHeight: "340px", maxHeight: "340px" }}>
          <Container>
            {followers.map((user) => {
              return (
                <UserDetails
                  userName={user.userName}
                  fullName={user.fullName}
                  profileImage={user.profileImage}
                />
              );
            })}
            <LoadingDiv>
              {isLoading ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                <FontAwesomeIcon
                  onClick={handleLoaderClick}
                  icon={faSquarePlus}
                  style={{
                    fontSize: "24px",
                    cursor:"pointer"
                  }}
                />
              )}
            </LoadingDiv>
          </Container>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default FollowerModal;
