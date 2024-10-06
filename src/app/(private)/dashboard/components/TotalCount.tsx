"use client";
import MUSIC_QUERY_KEY_ENUM from "@/services/music/keys";
import musicService from "@/services/music/musicService";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Card, Col, Row, Statistic } from "antd";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { CgMusicSpeaker } from "react-icons/cg";
import { FaRegListAlt, FaRegUser } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { LuAlbum } from "react-icons/lu";
import { MdHistory } from "react-icons/md";

const TotalCount = () => {
  const { isLoading, data } = useQuery({
    queryKey: [MUSIC_QUERY_KEY_ENUM.TOTAL_COUNT],
    queryFn: async () => {
      const response = await musicService.getTotalCount({});
      return response?.data;
    },
    placeholderData: (prev) => prev,
  });
  console.log("data", data);
  return (
    <div style={{ padding: "30px" }}>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card>
            <Row>
              <Col span={6}>
                <Avatar size={64} icon={<FaRegUser />} style={{ backgroundColor: "#87d068" }} /> {/* Hình đại diện */}
              </Col>
              <Col span={18}>
                <Statistic
                  className="text-lg font-semibold"
                  title="Tổng số người dùng"
                  value={data?.data?.totalUsers || 0}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Row>
              <Col span={6}>
                <Avatar size={64} icon={<CgMusicSpeaker />} style={{ backgroundColor: "#1890ff" }} />{" "}
                {/* Hình đại diện */}
              </Col>
              <Col span={18}>
                <Statistic
                  className="text-lg font-semibold"
                  title="Tổng số thể loại"
                  value={data?.data?.totalGenres || 0}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Row>
              <Col span={6}>
                <Avatar size={64} icon={<GrUserManager />} style={{ backgroundColor: "#f56a00" }} />{" "}
                {/* Hình đại diện */}
              </Col>
              <Col span={18}>
                <Statistic
                  className="text-lg font-semibold"
                  title="Tổng số nghệ sĩ"
                  value={data?.data?.totalArtists || 0}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col span={8}>
          <Card>
            <Row>
              <Col span={6}>
                <Avatar size={64} icon={<LuAlbum />} style={{ backgroundColor: "#7265e6" }} />
              </Col>
              <Col span={18}>
                <Statistic
                  className="text-lg font-semibold"
                  title="Tổng số album"
                  value={data?.data?.totalAlbums || 0}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Row>
              <Col span={6}>
                <Avatar size={64} icon={<BsMusicNoteBeamed />} style={{ backgroundColor: "#ffbf00" }} />
              </Col>
              <Col span={18}>
                <Statistic
                  className="text-lg font-semibold"
                  title="Tổng số bài hát"
                  value={data?.data?.totalSongs || 0}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Row>
              <Col span={6}>
                <Avatar size={64} icon={<FaRegListAlt />} style={{ backgroundColor: "#001529" }} />
                {/* Hình đại diện */}
              </Col>
              <Col span={18}>
                <Statistic
                  className="text-lg font-semibold"
                  title="Tổng số danh sách phát"
                  value={data?.data?.totalPlaylists || 0}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col span={8}>
          <Card>
            <Row>
              <Col span={6}>
                <Avatar size={64} icon={<MdHistory />} style={{ backgroundColor: "#ff4d4f" }} />
              </Col>
              <Col span={18}>
                <Statistic
                  className="text-lg font-semibold"
                  title="Tổng số lịch sử nghe"
                  value={data?.data?.totalHistories || 0}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TotalCount;
