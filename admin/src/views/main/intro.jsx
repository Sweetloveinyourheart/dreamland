import { useMutation, useQuery } from "@apollo/client";
import { Box, Button, ButtonGroup, CircularProgress, Divider, Grid, Tab, Tabs, TextField, Typography } from "@mui/material";
import { IconEdit } from "@tabler/icons";
import axios from "axios";
import { CloudName } from "constants/cloudinary";
import { UPDATE_PAGE_TEMPLATE } from "graphql/mutations/update";
import { GET_PAGE_TEMPLATE } from "graphql/queries/template";
import { useEffect, useState } from "react";
import ReactImageUploading from "react-images-uploading";
import MainCard from "ui-component/cards/MainCard";
import SubCard from "ui-component/cards/SubCard";
import Notification from "ui-component/notifications/notification";

function BannerManagement() {
    const [banner, setBanner] = useState({
        imgUrl: null,
        directLink: null,
        edit: false
    })
    const [bannerImages, setBannerImages] = useState([]);
    const [isUploading, setIsUploading] = useState(false)
    const [modal, setModal] = useState({
        message: '',
        active: false
    })

    const { data, error } = useQuery(GET_PAGE_TEMPLATE, {
        variables: {
            pageName: "introduction"
        },
        fetchPolicy: 'network-only'
    })
    const [update, { data: updateResult, error: updateErr }] = useMutation(UPDATE_PAGE_TEMPLATE)

    useEffect(() => {
        if (data && !error) {
            setBanner(s => ({ ...s, ...data.template?.banner }))
        }
    }, [data, error])

    useEffect(() => {
        if (updateResult && !updateErr) {
            setIsUploading(false)
            setModal({
                message: "Cập nhật banner thành công",
                active: true
            })
            setBannerImages([])
            setBanner(s => ({ ...s, edit: false }))
        }

        if (updateErr) {
            setIsUploading(false)
            setModal({
                message: "Cập nhật banner thất bại, vui lòng thử lại",
                active: true
            })
        }

    }, [updateResult, updateErr])

    const onBannerChange = (imageList) => {
        // data for submit
        setBannerImages(imageList);
    };

    const onUploadImage = async () => {
        try {
            if (bannerImages.length === 0) return null

            let formData = new FormData()

            const presets = Promise.all(bannerImages.map(async image => {
                formData.append("file", image.file)
                formData.append("upload_preset", "banners")
                const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${CloudName}/image/upload`, formData)
                return data?.secure_url
            }))

            return presets
        } catch (error) {
            return null
        }
    }

    const onClickBanner = () => {
        if (banner.directLink) {
            window.open(banner.directLink, '_blank')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsUploading(true)
        const presets = await onUploadImage()
        if (presets && presets.length === 1) {
            update({
                variables: {
                    pageName: "introduction",
                    data: {
                        banner: {
                            imgUrl: presets[0],
                            directLink: banner.directLink
                        }
                    }
                }
            })
        }

        if(!presets && banner.directLink && banner.imgUrl) {
            update({
                variables: {
                    pageName: "introduction",
                    data: {
                        banner: {
                            imgUrl: banner.imgUrl,
                            directLink: banner.directLink
                        }
                    }
                }
            })
        }

    }


    return (
        <MainCard>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                    <Grid xl={6} item>
                        <Typography variant="h3" sx={{ display: "flex", alignItems: "center", height: "100%" }}>
                            Banner giới thiệu
                        </Typography>
                    </Grid>
                    <Grid xl={6} item>
                        <Box display={"flex"} justifyContent="flex-end">
                            {banner.edit
                                ? (
                                    <Box sx={{ m: "0px 4px", position: 'relative' }}>
                                        <Button variant="contained" type="submit" disabled={isUploading}> Lưu thay đổi </Button>
                                        {isUploading && (
                                            <CircularProgress
                                                size={24}
                                                sx={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    marginTop: '-12px',
                                                    marginLeft: '-12px',
                                                }}
                                            />
                                        )}
                                    </Box>
                                )
                                : (
                                    <Tabs value={banner.edit} onChange={() => setBanner(s => ({ ...s, edit: !s.edit }))}>
                                        <Tab icon={<IconEdit />} label="Chỉnh sửa" value={true} iconposition="start" />
                                    </Tabs>
                                )
                            }
                        </Box>
                    </Grid>
                </Grid>
                <Divider sx={{ margin: 2 }} />
                <SubCard title="Quản lý hình ảnh hiển thị">
                    <Grid container spacing={2}>
                        <Grid xl={banner.edit ? 6 : 12} borderRight="1px solid #eee" item>
                            {banner.imgUrl
                                ? (<img src={banner.imgUrl} onClick={() => onClickBanner()} alt="banner" width={"100%"} />)
                                : (
                                    <Box minHeight={300} display="flex" alignItems={"center"} justifyContent="center">
                                        <Typography textAlign={"center"} variant="h4" color={"#777"}>
                                            Chưa đặt banner
                                        </Typography>
                                    </Box>
                                )
                            }
                        </Grid>
                        {banner.edit
                            && (
                                <Grid xl={banner.edit ? 6 : 12} item>
                                    <ReactImageUploading
                                        value={bannerImages}
                                        onChange={onBannerChange}
                                        maxNumber={1}
                                        dataURLKey="data_url"
                                    >
                                        {({
                                            imageList,
                                            onImageUpload,
                                            onImageRemoveAll,
                                            onImageUpdate,
                                            onImageRemove,
                                            isDragging,
                                            dragProps,
                                        }) => (
                                            // write your building UI
                                            <div className="upload__image-wrapper">
                                                <ButtonGroup sx={{ display: "flex", justifyContent: "center" }} fullWidth>
                                                    <Button
                                                        style={isDragging ? { color: 'red' } : undefined}
                                                        onClick={onImageUpload}
                                                        {...dragProps}
                                                        variant="contained"
                                                        color="secondary"
                                                    >
                                                        {banner.imgUrl ? "Chỉnh sửa banner" : "Thêm banner mới"}
                                                    </Button>
                                                    &nbsp;
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        onClick={onImageRemoveAll}
                                                    >
                                                        Reset lựa chọn
                                                    </Button>
                                                </ButtonGroup>
                                                <Grid marginTop={2} container spacing={1}>
                                                    {imageList.map((image, index) => (
                                                        <Grid item xs={12} lg={12} key={index}>
                                                            <div className="image-item" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                                                                <img src={image['data_url']} alt="" width="100%" />
                                                                <Box sx={{ display: "flex", justifyContent: "center", marginTop: 1 }} fullWidth>
                                                                    <Button variant="outlined" onClick={() => onImageUpdate(index)}>Sửa đổi</Button>
                                                                    <Button variant="outlined" onClick={() => onImageRemove(index)}>Loại bỏ</Button>
                                                                </Box >
                                                            </div>
                                                        </Grid>
                                                    ))}
                                                    <Grid item xs={12} lg={12}>
                                                        <TextField
                                                            fullWidth
                                                            label="Link điều hướng"
                                                            variant="outlined"
                                                            margin="normal"
                                                            onChange={(e) => setBanner(s => ({ ...s, directLink: e.target.value }))}
                                                            value={banner.directLink}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        )}
                                    </ReactImageUploading>
                                </Grid>
                            )
                        }
                    </Grid>
                </SubCard>
            </form>
            <Notification
                active={modal.active}
                message={modal.message}
                handleClose={() => setModal(s => ({ ...s, active: false }))}
            />
        </MainCard >
    );
}

export default BannerManagement;