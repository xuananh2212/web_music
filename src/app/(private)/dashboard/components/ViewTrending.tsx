"use client";
import MUSIC_QUERY_KEY_ENUM from "@/services/music/keys";
import musicService from "@/services/music/musicService";
import { useQuery } from "@tanstack/react-query";
import { Card } from "antd";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

// Xác định kiểu dữ liệu cho chartData
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

const ViewTrending = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const { isLoading, data } = useQuery({
    queryKey: [MUSIC_QUERY_KEY_ENUM.TRENDING_SONGS],
    queryFn: async () => {
      const response = await musicService.getTrendingSongs({});
      return response?.data;
    },
    placeholderData: (prev) => prev,
  });
  console.log("data", data);
  useEffect(() => {
    if (data) {
      const labels = data?.data?.map((item: any) => item.title);
      const trendingScores = data?.data?.map((item: any) => item?.calculatedTrendingScore);
      setChartData({
        labels,
        datasets: [
          {
            label: "Điểm thịnh hành",
            data: trendingScores,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    }

    return () => {
      setChartData(null);
    };
  }, [data]);

  if (isLoading || !chartData) return <p>Đang tải dữ liệu...</p>; // Hiển thị trong lúc tải dữ liệu

  return (
    <Card>
      <h2>Danh sách bài hát thịnh hành</h2>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          scales: { y: { beginAtZero: true } },
          plugins: {
            tooltip: {
              enabled: true,
              callbacks: {
                label: function (tooltipItem: any) {
                  return `Điểm thịnh hành: ${tooltipItem.raw}`; // Hiển thị giá trị cột khi hover
                },
              },
            },
          },
        }}
      />
    </Card>
  );
};

export default ViewTrending;
