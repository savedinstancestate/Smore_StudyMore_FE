import React, { useState, useEffect } from "react";
import API from "../../../api/AxiosInstance";
import { Form, Button } from "react-bootstrap";
import "./Management.css";

const EditPromotion = ({ studyPk }) => {
  const [formData, setFormData] = useState({
    adTitle: '',
    adContent: '',
    studyBoardPk: '',
    imageUri: ''
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    const fetchAdData = async () => {
      try {
        const response = await API.get(`/study/${studyPk}/management`);
        const data = response.data;
        setFormData({
          studyBoardPk: data.studyBoardPk,
          adTitle: data.adTitle,
          adContent: data.adContent,
          imageUri: data.imageUri
        });
        setIsLoading(false);
        setThumbnail(data.imageUri);
      } catch (error) {
        console.error("홍보글을 불러오는 데 실패했습니다.", error);
        setError("홍보글을 불러오는 데 실패했습니다.");
        setIsLoading(false);
      }
    };

    fetchAdData();
  }, [studyPk]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    if (selectedFile) {
      formDataToSend.append('imageUri', selectedFile);
    } else {
      formDataToSend.append('imageUri', formData.imageUri);
    }

    try {
      await API.put(`/study/${studyPk}/management/board`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert("홍보글 수정이 완료되었습니다.");
    } catch (error) {
      console.error("홍보글 수정 실패:", error);
      setError("홍보글 수정에 실패했습니다.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="header-container">
        <div className="title">홍보글 수정 📰</div>
        <Button
          type="submit"
          className="button"
          style={{
            backgroundColor: "#fff",
            border: "1px solid #009063",
            color: "#009063",
            fontWeight: "500",
            width: "80px",
            float: "right",
            marginRight: "6px",
          }}
          onClick={handleSubmit}
        >
          저장
        </Button>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="form-group-inline" controlId="adTitle">
          <Form.Label className="form-label-inline">글 제목</Form.Label>
          <Form.Control
            type="text"
            placeholder="홍보글 제목 입력"
            name="adTitle"
            value={formData.adTitle}
            onChange={handleChange}
            className="input-description"
          />
        </Form.Group>
        <Form.Group className="form-group" controlId="adContent">
          <Form.Label className="label">내용</Form.Label>
          <Form.Control
            className="input-content"
            as="textarea"
            rows={3}
            placeholder="홍보글 내용 입력"
            name="adContent"
            value={formData.adContent}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="label">대표사진</Form.Label>
          {thumbnail && <div className="image-preview"><img src={thumbnail} alt="Thumbnail" /></div>}
          <Form.Control
            className="input-img"
            type="file"
            name="imageUri"
            onChange={handleFileChange}
            custom
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default EditPromotion;
