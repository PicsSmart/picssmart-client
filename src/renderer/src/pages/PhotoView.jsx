import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import ModalImage from 'react-modal-image';
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Box,
  Avatar,
  TableContainer,
  TextField,
  IconButton,
  Chip
} from '@mui/material';
import { Edit, Check } from '@mui/icons-material';

import { setFaces } from '../store/reducers/faces';
import { updateMedia } from '../store/reducers/media';
import { setToast } from '../store/reducers/toast';

import { getFullSizeUrlById, getMediaByIdApi, getThumbnailUrlById, updateMediaApi } from '../services/apiService/media';
import { getFaceGroupIdApi, getFacesApi } from '../services/apiService/people';
import { similaritySearchById } from '../services/apiService/utilities';

import ImageGallery from '../components/ImageGallery';

import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../utils/constants';

const PhotoView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoDetails, setPhotoDetails] = useState(null);
  const [similarPhotos, setSimilarPhotos] = useState([]);
  const [fullSizeImageUrl, setFullSizeImageUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  const [onEdit, setOnEdit] = useState(false);

  const getFaces = async () => {
    try {
      setLoading(true);
      const { data } = await getFacesApi();
      dispatch(setFaces({ faces: data }));
    } catch (exception) {
      setError(exception);
    } finally {
      setLoading(false);
    }
  };

  const getPhotoDetails = async () => {
    try {
      setLoading(true);
      const { data } = await getMediaByIdApi(id);
      setPhotoDetails(data);
      const url = await getThumbnailUrlById(id);
      console.log('url', url);
      setThumbnailUrl(url);
    } catch (exception) {
      setError(exception);
      dispatch(
        setToast({
          toast: { open: true, message: ERROR_MESSAGES.PHOTO_DETAILS, severity: 'error' }
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const getSimilarPhotos = async () => {
    setSimilarPhotos([]);
    try {
      setLoading(true);
      const { data } = await similaritySearchById(id);
      data.results.map((element, index) => {
        if (index !== 0 && index < 6) {
          setSimilarPhotos((prev) => [...prev, element.payload]);
        }
      });
    } catch (exception) {
      setError(exception);
      dispatch(
        setToast({
          toast: { open: true, message: ERROR_MESSAGES.SIMILAR_PHOTOS, severity: 'error' }
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const getFaceGroupId = async (face, id) => {
    try {
      setLoading(true);
      const { data } = await getFaceGroupIdApi(face, id);
      return data[0].groupId;
    } catch (exception) {
      setError(exception);
    } finally {
      setLoading(false);
    }
  };

  const updateCaption = async (data, id) => {
    try {
      // console.log('here')
      setLoading(true);
      const response = await updateMediaApi(id, data);
      console.log(response.data);
      dispatch(
        setToast({
          toast: { open: true, message: SUCCESS_MESSAGES.CAPTION_UPDATED, severity: 'success' }
        })
      );
    } catch (exception) {
      setError(exception);
      dispatch(
        setToast({
          toast: { open: true, message: ERROR_MESSAGES.CAPTION_UPDATED, severity: 'error' }
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarClick = async (face, id) => {
    const groupId = await getFaceGroupId(face, id);
    // console.log(groupId)
    getFaces();
    navigate(`/people/${groupId}`);
  };

  const handleCaptionClick = () => {
    setOnEdit(false);
    // console.log(photoDetails?.caption)
    updateCaption(
      {
        caption: photoDetails?.caption,
        userReviewed: true
      },
      id
    );
    getPhotoDetails();
    dispatch(
      updateMedia({
        id: id,
        media: {
          caption: photoDetails?.caption,
          userReviewed: true
        }
      })
    );
  };

  useEffect(() => {
    getPhotoDetails().then(() => {
      getSimilarPhotos().then(() => {
        dispatch(
          setToast({
            toast: { open: true, message: SUCCESS_MESSAGES.PHOTO_DETAILS, severity: 'success' }
          })
        );
      });
    });

    async function fetchFullSizeUrl() {
      const url = await getFullSizeUrlById(id);
      setFullSizeImageUrl(url);
    }
    fetchFullSizeUrl();
  }, [window.location.pathname]);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Typography variant="h3" mb={'1rem'}>
          {photoDetails?.name}
        </Typography>
      </Box>
      <Grid container columnSpacing={3}>
        <Grid item md={6} xs={12}>
          <ModalImage
            small={fullSizeImageUrl}
            large={fullSizeImageUrl}
          />
        </Grid>
        <Grid item md={6}>
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableRow key={`${photoDetails?.name}-device`}>
                            <TableCell scope="row">
                                <Typography variant="h5">Device</Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Typography variant="h6">iPhone 13 pro max</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow key={`${photoDetails?.name}-resolution`}>
                            <TableCell scope="row">
                                <Typography variant="h5">Resolution</Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Typography variant="h6">4032 x 3024 , 9.4 MB</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow key={`${photoDetails?.name}-date`}>
                            <TableCell scope="row">
                                <Typography variant="h5">Date</Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Typography variant="h6">Tue, 13th Aug 2023 - 9.35 AM GMT+2</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow key={`${photoDetails?.name}-type`}>
                            <TableCell scope="row">
                                <Typography variant="h5">Image Type</Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Typography variant="h6">JPEG/JPG</Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" mt={'1rem'} mb={'1rem'} mr={'0.5rem'}>
          Generated Caption
        </Typography>
        <Chip
          color={photoDetails?.userReviewed ? 'success' : 'error'}
          label={photoDetails?.userReviewed ? 'Reviewed' : 'Not Reviewed'}
          variant="filled"
          size="small"
          sx={{ borderRadius: '15px' }}
        />
      </Box>
      <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
        <Grid item xs={8}>
          <TextField
            InputProps={{
              readOnly: !onEdit
            }}
            fullWidth
            id="standard-multiline-flexible"
            multiline
            maxRows={4}
            variant="standard"
            value={photoDetails?.caption}
            onChange={(e) => {
              setPhotoDetails(() => {
                return { ...photoDetails, caption: e.target.value };
              });
            }}
          />
        </Grid>
        <Grid item xs={1} ml={2}>
          {onEdit ? (
            <IconButton size="small" color="success" onClick={handleCaptionClick}>
              <Check />
            </IconButton>
          ) : (
            <IconButton
              size="small"
              color="picsmart"
              onClick={() => {
                setOnEdit(true);
              }}
            >
              <Edit />
            </IconButton>
          )}
        </Grid>
      </Grid>
      <Typography variant="h4" mt={'1rem'} mb={'1rem'}>
        Faces Detected
      </Typography>
      {photoDetails?.hasOwnProperty('faces') && (
        <TableContainer sx={{ maxHeight: '11rem' }}>
          <Table>
            <TableBody>
                <TableRow key={`${photoDetails?.name}-people`}>
                    <Grid container columnSpacing={2} rowSpacing={1} component={'td'}>
                        {photoDetails?.faces.map((face, index) => {
                        return (
                            <Grid item key={index}>
                                <Avatar
                                    onClick={() => {
                                    handleAvatarClick(face, photoDetails._id);
                                    }}
                                    variant="rounded"
                                    sx={{ width: '5rem', height: '5rem', borderRadius: 4 }}
                                    key={`face-${index}`}
                                    alt=""
                                    src={`${thumbnailUrl}?top=${face.top}&right=${
                                    face.right
                                    }&bottom=${face.bottom}&left=${face.left}`}
                                />
                            </Grid>
                        );
                        })}
                    </Grid>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Typography variant="h4" mt={'1.5rem'} mb={'1rem'}>
        Similar Photos
      </Typography>
      <ImageGallery images={similarPhotos} hidePagination={true} />
    </>
  );
};

export default PhotoView;
