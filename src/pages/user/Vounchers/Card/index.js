// trang vouonchers

import "./CardItem.css";
import "antd/dist/antd.css";
import { Button, Space, Card, Image, Col, Row } from "antd";
import { Link } from "react-router-dom";
const CardItem = (props) => {
  const { data } = props;

  return (
    <div>
      <Link to={`vouchers/${data["Slug"]}`}>
        <div className="site-card-wrapper">
          <Row>
            <Col span={12}>
              <Image src="https://lafactoriaweb.com/wp-content/uploads/2020/10/Voucher-la-gi-01-600x375.jpg" />
              <div className="card-price-container">
                <Space
                  direction="vertical"
                  size="large"
                  style={{ display: "flex" }}
                >
                  <Card
                    title="Vé tháng hăng say công việc"
                    size="small"
                    bordered={false}
                  >
                    <p>● Thẻ bay 0đ các chặng nội địa của Bamboo</p>
                    <p>● Thẻ định danh dành cho 1 người</p>
                    <p>● Bay các ngày trong tuần</p>
                  </Card>
                </Space>
                <div className="card-price">
                  <h2>1,650,000₫ - 4,500,000₫</h2>
                  <Button type="primary" className="btn-color">
                    Mua ngay
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Link>
    </div>
  );
};

export default CardItem;
