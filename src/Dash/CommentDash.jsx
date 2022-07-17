import React, { Fragment, useEffect, useState } from 'react'
// import firebase from 'firebase/compat/app'
// import 'firebase/compat/firestore'
// import 'firebase/compat/auth'
// import { useAuthState } from 'react-firebase-hooks/auth'
// import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Button } from 'react-bootstrap'
// import { collection, onSnapshot } from 'firebase/firestore'
// import db from '../core/firebase/firebase'
import { authAction } from '../core/services/AuthServices/AuthActions/AuthActions.core'
import { userOfferPrice } from '../core/services/OfferPriceService/OfferPriceService.core'
import './dash.scss'
import images from '../assets/images/category-analysis.png'
import $ from 'jquery'
// function SignIn() {
//     const signInWithGoogle = () => {
//         const auths = firebase.auth()
//         const provider = new firebase.auth.GoogleAuthProvider()
//         auths.signInWithPopup(provider)
//     }

//     return (
//         <Button onClick={signInWithGoogle}  >Sign In With Google</Button>
//     )
// }
// function SignOut() {
//     const auth = firebase.auth()
//     return auth.currentUser && (
//         <Button onClick={() => auth.signOut()}  >Sign Out</Button>
//     )
// }
// function ChatMessage(props) {
//     const { text, uid } = props.message
//     return <p className='mb-0 '> {text} </p>
// }
// function ChateRoom() {
//     const firestore = firebase.firestore()
//     const messageRef = firestore.collection('messages')
//     const query = messageRef.orderBy('createAt').limit(25)
//     const [messages] = useCollectionData(query, { idField: 'id' })

//     return (
//         <>
//             {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
//         </>
//     )

// }

const CommentDash = () => {
    // const [message, setMessages] = useState([])
    // useEffect(
    //     () =>
    //         onSnapshot(collection(db, "messages"), (snapshot) =>
    //             setMessages(snapshot?.docs?.map(doc => doc?.data()))
    //         )
    //     , [])
    // const auth = firebase.auth()
    // const firestore = firebase.firestore()

    // const [user] = useAuthState(auth)


    // const [ip, setIP] = useState('');
    // const getData = async () => {
    //     const res = await authAction._GET_IP()
    //     setIP(res.data.IPv4)
    // }


    // const [first, setfirst] = useState()
    // const transitionEnd = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend';
    // const animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

    // $('.shopping-cart').on(animationEnd, function (event) {
    //     $(this).removeClass('animated rubberBand');
    // });

    // $('.add-to-cart').on('click', function (event) {
    //     event.stopPropagation()
    //     const cart = $('.shopping-cart');
    //     const imgtodrag = $(this).parent('.item').find("img").eq(0);

    //     if (imgtodrag) {
    //         const imgclone = imgtodrag.clone()
    //             .css({
    //                 top: imgtodrag.offset().top,
    //                 left: imgtodrag.offset().left
    //             })
    //             .appendTo($('body')).addClass("move-to-cart");
    //         setTimeout(function () {
    //             imgclone.addClass("animate");
    //             imgclone.css({ "top": cart.offset().top + 10 });
    //             imgclone.css({ "left": cart.offset().left - 65 });
    //             imgclone.one(transitionEnd, function (event) {
    //                 imgclone.off(transitionEnd);
    //                 $(this).addClass("hide-img");
    //                 setTimeout(function () {
    //                     imgclone.one(transitionEnd, function (event) {
    //                         imgclone.off(transitionEnd);
    //                         $(this).detach();
    //                         cart.addClass('animated rubberBand');
    //                     });
    //                 }, 1);
    //             });
    //         }, 1);
    //     }
    // });
    return (
        <Fragment>
            {/* <header><SignOut /></header>
            <section>
                {user ? <ChateRoom /> : <SignIn />}
            </section>
            {message?.map((msg, idx) => {
                return <div key={idx} className="">
                    <p>{msg.name}</p>
                    <p>{msg.text}</p>
                    <p>{msg?.createdAt?.seconds && msg?.createdAt?.seconds}</p>
                </div>
            })}

            <>
                <Button onClick={getData} >
                    Get My IP Address
                </Button>
                {ip}
            </> */}
            {/* <div className="container px-0 bg-success" dir='ltr'>
                <div className="row m-0 d-flex align-items-center gap-1~ justify-content-between">
                    <div className="col-4 bg-info">one</div>
                    <div className="col-3 bg-danger">two</div>
                    <div className="col-4 bg-dark cLT-white-text">three</div>
                </div>
            </div> */}

            <div className="container">
                <div className="items row">
                    <div className="item col-sm-4">
                        <img className="item-img" src="http://img1.exportersindia.com/product_images/bc-small/dir_55/1620613/cannondale-jekyll-1-2011-mountain-bike-309779.jpg" alt="item" />
                        <h2>Item 1</h2>
                        <p>Price: <em>$449</em></p>
                        <button className="add-to-cart btn btn-primary" type="button">Add to cart</button>
                    </div>
                    <div className="item col-sm-4">
                        <img className="item-img" src="http://img1.exportersindia.com/product_images/bc-small/dir_55/1620613/cannondale-jekyll-1-2011-mountain-bike-309779.jpg" alt="item" />
                        <h2>Item 1</h2>
                        <p>Price: <em>$449</em></p>
                        <button className="add-to-cart btn btn-primary" type="button">Add to cart</button>
                    </div>
                    <div className="item col-sm-4">
                        <img className="item-img" src="http://img1.exportersindia.com/product_images/bc-small/dir_55/1620613/cannondale-jekyll-1-2011-mountain-bike-309779.jpg" alt="item" />
                        <h2>Item 1</h2>
                        <p>Price: <em>$4409</em></p>
                        <button className="add-to-cart btn btn-primary" type="button">Add to cart</button>
                    </div>
                </div>

            </div>
            <div className="container">
                <h1 className="pull-left">Bike Stock</h1>
                <span className="shopping-cart-container pull-right">
                    <i className="shopping-cart"></i>
                </span>
            </div>
        </Fragment>
    )
}

export default CommentDash