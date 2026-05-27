import React from 'react'
import Navbar from "../components/layout/Navbar";
import ProfileCard from "../components/profile/ProfileCard";
import BalanceCard from "../components/profile/BalanceCard";
import ServiceList from "../components/services/ServiceList";
import BannerList from "../components/banners/BannerList";

export default function HomePage() {
  return (
    <>
      <Navbar />
       <main className="cotainer mx-auto px-4 py-6 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-10">
          <ProfileCard />
          <BalanceCard />
        </div>

        <div className="mr-10 ml-10">
          <ServiceList />
          <BannerList />
        </div>

        

        
      </main>
    </>
  )
}
