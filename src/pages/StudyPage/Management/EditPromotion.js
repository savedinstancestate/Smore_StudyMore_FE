import React, { useState, useEffect } from "react";
import API from "../../../api/AxiosInstance";
import { Form, Button } from "react-bootstrap";
import "./Management.css";

const EditPromotion = ({ studyPk }) => {
  const [formData, setFormData] = useState({
    adTitle: "",
    adContent: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdData = async () => {
      try {
        const response = await API.get(`/study/management/${studyPk}`);
        const data = response.data;
        setFormData({
          adTitle: data.adTitle,
          adContent: data.adContent,
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch promotion data:", error);
        setIsLoading(false);
        setError("Failed to fetch promotion data.");
      }
    };

    fetchAdData();
  }, [studyPk]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/study/${studyPk}`, formData);
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
            placeholder="홍보글 제목"
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
            placeholder="홍보글 내용을 입력하세요."
            name="adContent"
            value={formData.adContent}
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default EditPromotion;
