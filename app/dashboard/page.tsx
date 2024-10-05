"use client";
import { useUserStore } from "@/store/user";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LuLogOut } from "react-icons/lu";
import { useWalletMultiButton } from "@solana/wallet-adapter-base-ui";

import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  useWalletModal,
} from "@solana/wallet-adapter-react-ui";
import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";
import { BiDotsVertical } from "react-icons/bi";
import { BsChat } from "react-icons/bs";

const Dashboard = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const [isLoading, setIsLoading] = useState(true);

  if (!user) {
    router.push("/login");
  }

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };
  const { setVisible: setModalVisible } = useWalletModal();

  const { buttonState, onConnect, onDisconnect, publicKey, walletIcon } =
    useWalletMultiButton({
      onSelectWallet() {
        setModalVisible(true);
      },
    });

  const Menu = () => {
    const handleMenuClick: MenuProps["onClick"] = (e) => {
      if (e.key === "1") {
        setModalVisible(true);
        if (onConnect) {
          onConnect();
        }
      } else if (e.key === "2") {
        if (onDisconnect) {
          onDisconnect();
        }
      }
    };
    const items: MenuProps["items"] = [
      {
        label: "Change Wallet",
        key: "1",
        icon: <UserOutlined />,
      },
      {
        label: "Disconnect",
        key: "2",
        icon: <UserOutlined />,
      },
    ];

    const menuProps = {
      items,
      onClick: handleMenuClick,
    };

    return (
      <Dropdown menu={menuProps} trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <BiDotsVertical size="1.5rem" className="cursor-pointer" />
          </Space>
        </a>
      </Dropdown>
    );
  };

  return isLoading ? null : (
    <div className="h-screen bg-black">
      <div className="bg">
        <div>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <header className="cd__intro">
        <h1>Dashboard</h1>
      </header>
      <main className="cd__main">
        <div className="profile-page">
          <div className="content">
            <div className="content__cover">
              <div className="mt-3 w-[12rem] h-[12rem] bottom-0 left-1/2 z-[2] bg-cover">
                <img
                  className="rounded-[50%] h-full w-full object-cover"
                  src="https://image.freepik.com/free-photo/friendly-brunette-looking-camera_23-2147774849.jpg"
                  alt=""
                />
              </div>
            </div>
            <div
              onClick={() => router.push("/chatbox")}
              className="absolute left-3 top-3 flex gap-3 text-lg justify-center items-center cursor-pointer"
            >
              <BsChat />
              <span>Chat box</span>
            </div>
            <div
              onClick={handleLogout}
              className="absolute right-3 top-3 flex gap-3 text-lg justify-center items-center cursor-pointer"
            >
              <LuLogOut />
              <span>Logout</span>
            </div>
            <div className="content__title">
              <h1>{`${user?.firstName} ${user?.lastName}`}</h1>
            </div>
            <div className="">
              {buttonState === "connected" ? (
                <div className="text-md mt-5 font-semibold flex gap-3">
                  <span>Wallet Connected:</span>
                  <span>
                    <img
                      src={walletIcon}
                      alt="Wallet Icon"
                      className="w-6 h-6"
                    />
                  </span>
                  <span>
                    {`${
                      publicKey && publicKey?.toString()?.slice(0, 4)
                    }...${publicKey?.toString()?.slice(-4)}`}
                  </span>
                </div>
              ) : (
                <>
                  <p>Wallet Not Connected</p>
                </>
              )}
            </div>
            <ul className="content__list">
              <li>
                <span>{user?.credit}</span>Credits
              </li>
              <li>
                <span>{user?.noOfPrompts}</span>Prompts
              </li>
            </ul>
            <div className="flex items-center justify-center gap-3">
              <div className="content__button">
                <a className="button" href="#">
                  <p
                    onClick={() => {
                      switch (buttonState) {
                        case "no-wallet":
                          setModalVisible(true);
                          break;
                        case "has-wallet":
                          if (onConnect) {
                            onConnect();
                          }
                          break;
                      }
                    }}
                  >
                    {buttonState === "connected"
                      ? "Connected"
                      : "Connect Wallet"}
                  </p>
                </a>
              </div>
              {buttonState === "connected" ? (
                <div className="relative">
                  <Menu />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </main>
      <footer className="relative text-white mt-12 mx-auto text-center z-10">
        Copyright Sol3Hive
      </footer>
    </div>
  );
};

const Wallet = ({ children }: { children: React.ReactNode }) => {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      /**
       * Wallets that implement either of these standards will be available automatically.
       *
       *   - Solana Mobile Stack Mobile Wallet Adapter Protocol
       *     (https://github.com/solana-mobile/mobile-wallet-adapter)
       *   - Solana Wallet Standard
       *     (https://github.com/anza-xyz/wallet-standard)
       *
       * If you wish to support a wallet that supports neither of those standards,
       * instantiate its legacy wallet adapter here. Common legacy adapters can be found
       * in the npm package `@solana/wallet-adapter-wallets`.
       */
      new UnsafeBurnerWalletAdapter(),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

const MainDashboard = () => {
  return (
    <Wallet>
      <Dashboard />
    </Wallet>
  );
};

export default MainDashboard;
