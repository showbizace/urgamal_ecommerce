import GlobalLayout from "@/components/GlobalLayout/GlobalLayout"
import { useEffect } from "react"
import React, { Component } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';


const Location = () => {

    useEffect(() => {
        window.dispatchEvent(new Event('storage'))
    })
    return (
        <div>
            <GlobalLayout />
            <div className="bg-grey-back w-full h-full px-32 py-6">
                dasdas
                {/* <div>
                    <html>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2673.8686112477762!2d106.92975681516502!3d47.91957967429866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96930eab8c57d9%3A0xe8d4a5c07d31f1d2!2z0KLQsNGA0LjQvNCw0Lsg0KPRgNCz0LDQvNCw0Lsg0q_RgNC40LnQvSDQtNGN0LvQs9Kv0q_RgA!5e0!3m2!1smn!2smn!4v1680113146511!5m2!1smn!2smn" width="600" height="450" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </html>
                </div> */}
            </div>
        </div>
    )
}

export default Location