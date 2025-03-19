import { DashboardHeader } from "@/components/dashboard/header";
import { Layout } from "@/components/layout";
import { isAuthenticated } from "@/components/services/auth";
import Router from "next/router";
import React, { useEffect, useState } from "react";

interface NewsItem {
  id: number;
  title: string;
  date: string;
  icon: string;
}

const Index = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  // Simulate fetching news from an API
  useEffect(() => {
    if (!isAuthenticated()) {
      Router.replace("/");
      return;
    }

    const initialNews: NewsItem[] = [
      {
        id: 1,
        title: "New Semester Starts on April 15",
        date: "2025-04-15",
        icon: "📰",
      },
      { id: 2, title: "Annual Fest on May 20", date: "2025-05-20", icon: "🎉" },
      {
        id: 3,
        title: "Guest Lecture on Cybersecurity - March 25",
        date: "2025-03-25",
        icon: "📢",
      },
    ];
    setTimeout(() => setNews(initialNews), 1000); // Simulate API delay
  }, []);

  return (
    <Layout>
      <DashboardHeader />
      <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          📢 College News & Events
        </h1>

        {/* News List */}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {news.length === 0 ? (
            <p style={{ textAlign: "center" }}>Loading news...</p>
          ) : (
            news.map((item) => (
              <li
                key={item.id}
                style={{ padding: "10px", borderBottom: "1px solid #ddd" }}
              >
                <span style={{ marginRight: "10px" }}>{item.icon}</span>
                <strong>{item.title}</strong> - <em>{item.date}</em>
              </li>
            ))
          )}
        </ul>
      </div>
    </Layout>
  );
};

export default Index;
