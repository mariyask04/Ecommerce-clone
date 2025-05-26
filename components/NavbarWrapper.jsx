"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import ForgotPasswordModal from "./ForgotPasswordModal";

const NavbarWrapper = () => {
    const [showForgotModal, setShowForgotModal] = useState(false);

    return (
        <>
            <Navbar
                showForgotModal={showForgotModal}
                setShowForgotModal={setShowForgotModal}
            />
            <ForgotPasswordModal
                isOpen={showForgotModal}
                onClose={() => setShowForgotModal(false)}
            />
        </>
    );
};

export default NavbarWrapper;
