"use client";
import { useUserStore } from "@/store/user";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { LuLogOut } from "react-icons/lu";
import { useWalletMultiButton } from "@solana/wallet-adapter-base-ui";

import {
  clusterApiUrl,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useMemo } from "react";
import {
  ConnectionProvider,
  useConnection,
  useWallet,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletAdapterNetwork,
  WalletNotConnectedError,
} from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  useWalletModal,
} from "@solana/wallet-adapter-react-ui";
import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space, Spin } from "antd";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";
import { BiDotsVertical, BiUser } from "react-icons/bi";
import { BsChat } from "react-icons/bs";
import Swal from "sweetalert2";

import { Modal, Select, Form } from "antd";

const { Option } = Select;

const Dashboard = () => {
  const router = useRouter();

  const { setVisible: setModalVisible } = useWalletModal();

  const { buttonState, onConnect, onDisconnect, publicKey, walletIcon } =
    useWalletMultiButton({
      onSelectWallet() {
        setModalVisible(true);
      },
    });

  const { connection } = useConnection();
  const { sendTransaction } = useWallet();

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const logout = useUserStore((state) => state.logout);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCredits, setSelectedCredits] = useState(0);

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

  const toggleModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  const handleSelectChange = (value: number) => {
    setSelectedCredits(value);
  };

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
  type Error = {
    message: string;
  };
  const onClick = useCallback(async () => {
    setIsLoading(true);
    try {
      if (!publicKey) throw new WalletNotConnectedError();

      const toPublickey = process.env.NEXT_PUBLIC_WALLET_PUBLIC_KEY;

      if (!toPublickey) throw new Error("Cannot initialize transfer");

      // 890880 lamports as of 2024-10-11
      const lamports = await connection.getMinimumBalanceForRentExemption(0);
      const amount = lamports * (selectedCredits / 10 || 1);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(
            process.env.NEXT_PUBLIC_WALLET_PUBLIC_KEY || ""
          ),
          lamports: amount,
        })
      );

      const {
        context: { slot: minContextSlot },
        value: { blockhash, lastValidBlockHeight },
      } = await connection.getLatestBlockhashAndContext();

      const signature = await sendTransaction(transaction, connection, {
        minContextSlot,
      });

      await connection.confirmTransaction({
        blockhash,
        lastValidBlockHeight,
        signature,
      });

      // update user
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          data: {
            credit: { increment: 10 * (selectedCredits / 10 || 1) },
          },
        }),
      });

      const data = await res.json();
      setUser(data.user || user);
    } catch (error: unknown) {
      Swal.fire({
        title: "Error!",
        text: (error as Error)?.message || "Error initializing transfer",
        icon: "error",
      });
    }

    setIsLoading(false);
  }, [publicKey, sendTransaction, connection, selectedCredits]);

  return (
    <Spin spinning={isLoading} size="large" className="z-[10000]">
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
                <div className="mt-3 w-[10rem] h-[10rem] bottom-0 left-1/2 z-[2] bg-cover rounded-[50%]">
                  <BiUser className="h-full w-full" />
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
              <div className="flex items-center justify-center gap-3 my-6">
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
              {buttonState === "connected" && (
                <div>
                  <button
                    className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5"
                    onClick={toggleModal}
                  >
                    Buy Credit
                  </button>
                </div>
              )}
            </div>
          </div>
          <Modal
            title="Purchase Credits"
            open={isModalVisible}
            onCancel={toggleModal}
            footer={null}
          >
            <Form layout="vertical">
              <Form.Item label="Select Credits" className="mt-5">
                <Select
                  placeholder="Select credits"
                  onChange={handleSelectChange}
                  value={selectedCredits}
                >
                  <Option value={10}>10 Credits</Option>
                  <Option value={20}>20 Credits</Option>
                  <Option value={30}>30 Credits</Option>
                </Select>
              </Form.Item>

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5 mx-auto w-full"
                onClick={() => {
                  toggleModal();
                  onClick();
                }}
              >
                Buy Credit
              </button>
            </Form>
          </Modal>
        </main>
        <footer className="relative text-white mt-12 mx-auto text-center z-10">
          Copyright Sol3Hive
        </footer>
      </div>
    </Spin>
  );
};

const Wallet = ({ children }: { children: React.ReactNode }) => {
  const network = useMemo(
    () =>
      process.env.NODE_ENV === "production"
        ? WalletAdapterNetwork.Mainnet
        : process.env.NODE_ENV === "development"
        ? WalletAdapterNetwork.Devnet
        : WalletAdapterNetwork.Testnet,
    [process.env.NODE_ENV]
  );
  console.log("Network>>>", network);

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [new UnsafeBurnerWalletAdapter()],
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
