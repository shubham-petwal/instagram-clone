import { useEffect, useState, useContext, useRef } from "react";
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
  FollowingBtn,
  FollowingDiv,
} from "./styledComponents/FollowerModal.style";
import { AuthContext } from "../context/AuthContext";

import "../styles/FollowerModal.scss";

interface FollowersInterface {
  fullName: string;
  profileImage: string;
  userName: string;
  userId: string;
  document_id: string;
}
interface ButtonProps {
  targetUserId: string;
}
interface UserDetailProps {
  profileImage: string;
  userName: string;
  fullName: string;
  method: "followers" | "following";
  followerUserId: string;
}

function RemoveButton(props: ButtonProps) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isFollowing, setFollowing] = useState<boolean>(true);
  const user = useContext(AuthContext);
  const userId = user?.uid;
  const targetUserId = props.targetUserId;
  async function handleButtonClick() {
    try {
      // to remove user from followers list is equivalent of unfollowing of that user to you
      setLoading(true);
      const result = await axios.post("http://localhost:90/follow", {
        userId: targetUserId,
        target_userId: userId,
      });
      setLoading(false);
      setFollowing(!isFollowing);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }
  return (
    <>
      {isFollowing ? (
        isLoading ? (
          <FollowingBtn>
            <Spinner animation="border" role="status" size="sm">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </FollowingBtn>
        ) : (
          <FollowingBtn onClick={handleButtonClick}>Remove</FollowingBtn>
        )
      ) : (
        <FollowingDiv>Remove</FollowingDiv>
      )}
    </>
  );
}

function FollowingButton(props: ButtonProps) {
  const user = useContext(AuthContext);
  const userId = user?.uid;
  const targetUserId = props.targetUserId;
  const [isFollowing, setFollowing] = useState<boolean>(true);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:90/${userId}/isFollowing/${targetUserId}`)
      .then((result) => {
        setFollowing(result.data.data.isFollowing);
      });
    setLoading(false);
  }, [isFollowing]);

  async function handleButtonClick() {
    try {
      setLoading(true);
      const result = await axios.post("http://localhost:90/follow", {
        userId,
        target_userId: targetUserId,
      });
      setFollowing(!isFollowing);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  return (
    <>
      {isFollowing ? (
        isLoading ? (
          <FollowingBtn>
            <Spinner animation="border" role="status" size="sm">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </FollowingBtn>
        ) : (
          <FollowingBtn onClick={handleButtonClick}>following</FollowingBtn>
        )
      ) : isLoading ? (
        <FollowBtn>
          <Spinner animation="border" role="status" size="sm">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </FollowBtn>
      ) : (
        <FollowBtn onClick={handleButtonClick}>follow</FollowBtn>
      )}
    </>
  );
}

function UserDetails(props: UserDetailProps) {
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
          {props.method == "followers" ? (
            <RemoveButton targetUserId={props.followerUserId} />
          ) : (
            <FollowingButton targetUserId={props.followerUserId} />
          )}
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
    return () => {
      setFollowers([]);
      setLastDoc("");
    };
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
            {followers.map((follower) => {
              return (
                <UserDetails
                  followerUserId={follower.userId}
                  userName={follower.userName}
                  fullName={follower.fullName}
                  profileImage={follower.profileImage}
                  method={props.method}
                />
              );
            })}
            <LoadingDiv>
              {isLoading ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : lastDoc ? (
                <FontAwesomeIcon
                  onClick={handleLoaderClick}
                  icon={faSquarePlus}
                  style={{
                    fontSize: "24px",
                    cursor: "pointer",
                  }}
                />
              ) : null}
            </LoadingDiv>
          </Container>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default FollowerModal;
