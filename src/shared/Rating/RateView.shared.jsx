import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import './RateView.shared.scss'
import StarRatings from "react-star-ratings";

const RateViewShared = ({ RateNumber }) => {
    return (
        <>
            {/* // <Box
        //     sx={{
        //         width: 140,
        //         display: 'flex',
        //         alignItems: 'center',
        //     }}
        // >
        //     <Rating
        //         readOnly
        //         name="hover-feedback"
        //         value={RateNumber !== undefined && RateNumber}
        //         precision={0.5}
        //         emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        //     />
        //     {RateNumber}
        // </Box>
        // <StarRatings
        //     rating={RateNumber}
        //     starRatedColor="#faaf00"
        //     starDimension="24px"
        //     numberOfStars={5}
        // /> */}
        </>
    );
}
export default React.memo(RateViewShared)