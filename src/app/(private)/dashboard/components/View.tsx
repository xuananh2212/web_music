"use client";
import MUSIC_QUERY_KEY_ENUM from "@/services/music/keys";
import musicService from "@/services/music/musicService";
import { useQuery } from "@tanstack/react-query";
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

const View = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null); // Thiết lập kiểu cho chartData

  // Sử dụng react-query để lấy dữ liệu từ API
  const { isLoading, data } = useQuery({
    queryKey: [MUSIC_QUERY_KEY_ENUM.SONGS],
    queryFn: async () => {
      const response = await musicService.getListenCounts({});
      return response?.data;
    },
    placeholderData: (prev) => prev, // Đảm bảo rằng placeholderData trả về đúng kiểu
  });
  console.log(data);

  // Xử lý khi có dữ liệu từ react-query
  useEffect(() => {
    if (data?.data) {
      const labels = data?.data.map((item: any) => item.songTitle);
      const listenCounts = data?.data.map((item: any) => item.listenCount);

      setChartData({
        labels,
        datasets: [
          {
            label: "Số lượt nghe nhiều nhất",
            data: listenCounts,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    }

    return () => {
      // Cleanup effect khi component bị unmount
      setChartData(null);
    };
  }, [data]);

  if (isLoading || !chartData) return <p>Đang tải dữ liệu...</p>; // Hiển thị trong lúc tải dữ liệu

  return (
    <div>
      <h2>Số lượt nghe nhiều nhất bài hát</h2>
      <Bar data={chartData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
    </div>
  );
};

export default View;
