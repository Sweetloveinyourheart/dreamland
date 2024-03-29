import Head from "next/head";
import { FunctionComponent, useState } from "react";
import { FaAngleDoubleRight, FaCity, FaMapMarkedAlt, FaUniversity } from "react-icons/fa";
import { BiPhone } from "react-icons/bi"
import Header from "../../../components/header/header";
import styles from '../../../styles/pages/chi-tiet.module.scss'
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image";
import Footer from "../../../components/footer/footer";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { initializeApollo } from "../../../lib/apolloClient";
import { ApartmentInterface } from "../../../types/interfaces/apartment";
import { GET_APARTMENT_POST_BY_DIRECT_LINK } from "../../../graphql/queries/postPage";
import { RealEstateCategory } from "../../../types/enums/realEstate";
import { directionSpeaker, furnitureSpeaker, legalDocumentsSpeaker, moneyConverter, userTypeSpeaker } from "../../../lib/converter";
import { useRouter } from "next/router";
// import Maps from "../../../components/maps/maps";
import { useQuery } from "@apollo/client";
import { ApartmentPostResult, ApartmentPostVars, GET_APARTMENT_POSTS } from "../../../graphql/queries/browsingPost";
import Items from "../../../components/items/items";
import PageLinks from "../../../components/links/links";

interface ApartmentPageProps {
    data: ApartmentInterface | null
}

const ApartmentPage: FunctionComponent<ApartmentPageProps> = ({ data }) => {
    const [showPhoneNumber, setShowPhoneNumber] = useState<boolean>(false)
    // const [showMaps, setShowMaps] = useState<boolean>(false)

    const router = useRouter()
    const { data: relativePosts } = useQuery<ApartmentPostResult, ApartmentPostVars>(GET_APARTMENT_POSTS, {
        variables: {
            filter: {
                category: data?.category || "MuaBan"
            },
            paging: {
                limit: 5,
                cursor: (data && data.index > 5) ? data?.index - 5 : 0
            }
        },
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'network-only'
    })


    const renderMedia = () => {
        let result;
        if (data)
            result = data.media.images.map((el, id) => {
                return (
                    <div className={styles["image"]} key={id}>
                        <img src={el} />
                        <span>
                            <Image
                                src={el}
                                width={800}
                                height={600}
                                alt="Image"
                            />
                        </span>
                        <div className={styles['image__abs']}>
                            <img src={el} />
                        </div>
                    </div>
                )
            })

        return result
    }

    if (!data) return null

    return (
        <>
            <Head>
                <title> {data.title} </title>
                <link rel="icon" href="https://res.cloudinary.com/dienkhoiland/image/upload/v1656394563/logo/LOGO-DIEN-KHOI_amhn6i.ico" />
            </Head>
            <Header />
            <main className={styles['realestate']}>
                <div className="container">
                    <PageLinks category={data.category} title={data.title} />
                    <div className={styles['area']}>
                        <div className={styles['information']}>
                            <div className={styles['information__media']}>
                                <Carousel>
                                    {renderMedia()}
                                </Carousel>
                            </div>
                            <div className={styles['information__quick-info']}>
                                <div className={styles['contact']}>
                                    <div className={styles['contact-owner']}>
                                        <Image src={'https://res.cloudinary.com/dienkhoiland/image/upload/v1656326293/icons/profile_om2daw.png'} width={50} height={50} />
                                        <div className={styles['contact-owner__info']}>
                                            <h5>{data.owner.name}</h5>
                                        </div>
                                    </div>
                                    <div className={styles['contact-phone']}>
                                        <div className={styles['contact-phone__guard']} onClick={() => setShowPhoneNumber(s => !s)}>
                                            <div className={`${styles['phone--hidden']}`}>
                                                <BiPhone />
                                                <span>
                                                    {showPhoneNumber
                                                        ? (data.owner.phone)
                                                        : (`${data.owner.phone.slice(0, 4)}******`)
                                                    }
                                                </span>
                                            </div>
                                            <div>Bấm để hiện số</div>
                                        </div>
                                    </div>
                                    <div className={styles['overview']}>
                                        <h4> Thông tin cơ bản </h4>
                                        <div className={styles['overview__col']}>
                                            <div className={styles['overview-item']}>
                                                <div className={styles['overview-item__image']}>
                                                    <Image src={"https://res.cloudinary.com/dienkhoiland/image/upload/v1656326104/icons/dien-tich_ys076w.png"} width={25} height={25} alt="dien-tich" />
                                                </div>
                                                <span>Diện tích: </span>
                                                <span>{data.detail.acreage.totalAcreage} m²</span>
                                            </div>
                                            <div className={styles['overview-item']}>
                                                <div className={styles['overview-item__image']}>
                                                    <Image src={"https://res.cloudinary.com/dienkhoiland/image/upload/v1656326104/icons/double-bed_e32ctb.png"} width={25} height={25} alt="dien-tich" />
                                                </div>
                                                <span>Phòng ngủ: </span>
                                                <span>{data.overview.numberOfBedrooms} phòng</span>
                                            </div>
                                            {data.overview.numberOfBathrooms
                                                && (
                                                    <div className={styles['overview-item']}>
                                                        <div className={styles['overview-item__image']}>
                                                            <Image src={"https://res.cloudinary.com/dienkhoiland/image/upload/v1656326105/icons/toilet_yo0nkp.png"} width={25} height={25} alt="dien-tich" />
                                                        </div>
                                                        <span>Phòng vệ sinh: </span>
                                                        <span>{data.overview.numberOfBathrooms} phòng</span>
                                                    </div>
                                                )
                                            }
                                            {data.overview.legalDocuments
                                                && (
                                                    <div className={styles['overview-item']}>
                                                        <div className={styles['overview-item__image']}>
                                                            <Image src={"https://res.cloudinary.com/dienkhoiland/image/upload/v1656326104/icons/contract_stctxg.png"} width={25} height={25} alt="dien-tich" />
                                                        </div>
                                                        <span>Giấy tờ pháp lý: </span>
                                                        <span>{legalDocumentsSpeaker(data.overview.legalDocuments)}</span>
                                                    </div>
                                                )
                                            }
                                            {data.overview.furniture
                                                && (
                                                    <div className={styles['overview-item']}>
                                                        <div className={styles['overview-item__image']}>
                                                            <Image src={"https://res.cloudinary.com/dienkhoiland/image/upload/v1656326105/icons/sofa_yfy1ep.png"} width={25} height={25} alt="dien-tich" />
                                                        </div>
                                                        <span>Tình trạng nội thất: </span>
                                                        <span>{furnitureSpeaker(data.overview.furniture)}</span>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className={styles['overview__col']}>

                                            {data.category === RealEstateCategory.MuaBan
                                                && (
                                                    <div className={styles['overview-item']}>
                                                        <div className={styles['overview-item__image']}>
                                                            <Image src={"https://res.cloudinary.com/dienkhoiland/image/upload/v1656326105/icons/money_sbwwui.png"} width={25} height={25} alt="dien-tich" />
                                                        </div>
                                                        <span>Giá/m2: </span>
                                                        <span>{moneyConverter(Math.round(data.detail.pricing.total / data.detail.acreage.totalAcreage))}/m²</span>
                                                    </div>
                                                )
                                            }
                                            {data.overview.doorDirection
                                                && (
                                                    <div className={styles['overview-item']}>
                                                        <div className={styles['overview-item__image']}>
                                                            <Image src={"https://res.cloudinary.com/dienkhoiland/image/upload/v1656326104/icons/north_q8ugah.png"} width={25} height={25} alt="dien-tich" />
                                                        </div>
                                                        <span>Hướng cửa chính: </span>
                                                        <span>{directionSpeaker(data.overview.doorDirection)}</span>
                                                    </div>
                                                )
                                            }
                                            {data.overview.balconyDirection
                                                && (
                                                    <div className={styles['overview-item']}>
                                                        <div className={styles['overview-item__image']}>
                                                            <Image src={"https://res.cloudinary.com/dienkhoiland/image/upload/v1656326104/icons/north_q8ugah.png"} width={25} height={25} alt="dien-tich" />
                                                        </div>
                                                        <span>Hướng ban công: </span>
                                                        <span>{directionSpeaker(data.overview.balconyDirection)}</span>
                                                    </div>
                                                )
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles['content']}>

                            <div className={styles['name']}>
                                {data.title}
                            </div>
                            <div className={styles['price']}>
                                <span>{moneyConverter(data.detail.pricing.total)}</span>
                                <span> - {data.detail.acreage.totalAcreage} m2</span>
                            </div>

                            <div className={styles['address']}>
                                <FaMapMarkedAlt />
                                <p>{data.detail.address?.houseNumber ? `${data.detail.address.houseNumber} - ` : ""}
                                    {data.detail.address.street}
                                    - {data.detail.address.ward}
                                    - {data.detail.address.district}
                                    - {data.detail.address.province}
                                </p>
                            </div>
                            <div className={styles['description']}>
                                {data.description}
                            </div>
                        </div>

                    </div>
                    <div className={styles['stall']}>
                        <h4> Tin bất động sản liên quan </h4>
                        <div className={styles['stall__items']}>
                            <Items data={relativePosts?.apartments || []} />
                        </div>
                        <div className={styles['stall__more']}>
                            <Link href={"/"}> Xem thêm tin liên quan </Link>
                        </div>
                    </div>
                </div>
            </main>
            {/* <Maps show={showMaps} handleShow={setShowMaps} address={data.detail.address} /> */}
            <Footer />
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const { directLink } = context.query
        if (!directLink) {
            return {
                redirect: {
                    destination: "/mua-ban-bat-dong-san",
                    permanent: false
                }
            }
        }

        const client = initializeApollo()
        const { data } = await client.query<{ getApartmentPostByLink: ApartmentInterface }>({
            query: GET_APARTMENT_POST_BY_DIRECT_LINK,
            variables: {
                link: String(directLink)
            }
        })

        return {
            props: {
                data: data?.getApartmentPostByLink ?? null
            }
        }
    } catch (error) {
        return {
            props: {
                data: null
            }
        }
    }
}

export default ApartmentPage;