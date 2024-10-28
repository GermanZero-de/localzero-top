import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import SocialIcon from "./SocialIcon";
import styles from "../styles/Footer.module.scss";

export default function Footer() {
    return (
        <div className="bg-secondary mt-auto">
            <Container className="p-3">
                <Row>
                    <Col className="content-align-left fs-5 text-left text-white">
                        <ul className="footer-nav-list">

                            <li>
                                {" "}
                                <a href="/datenschutz">DAS PROJEKT</a>
                            </li>
                            <li>
                                {" "}
                                <a href="/impressum">KOMMUNEN</a>
                            </li>
                            <li>
                                {" "}
                                <a href="/impressum">TOP-MASSNAHMEN</a>
                            </li>
                            <li>
                                {" "}
                                <a href="https://localzero.net/" target="new">LOCALZERO</a>
                            </li>
                        </ul>
                    </Col>
                    <Col className="d-flex align-items-center text-center">
                        <SocialIcon
                            name="facebook"
                            link="https://de-de.facebook.com/GermanZero.NGO"
                        />
                        <SocialIcon
                            name="x"
                            link="https://twitter.com/_germanzero"
                        />
                        <SocialIcon
                            name="youtube"
                            link="https://www.youtube.com/channel/UCyio7GV0kpXeOu5m6Xo6A3A"
                        />
                        <SocialIcon
                            name="linkedin"
                            link="https://www.linkedin.com/showcase/localzero/"
                        />
                        <SocialIcon
                            name="instagram"
                            link="https://www.instagram.com/_GermanZero/"
                        />
                    </Col>
                    <Col className="d-flex align-items-center justify-content-end text-center">
                        <a
                            href="https://www.transparency.de/"
                            rel="noopener nofollow"
                            target="_blank"
                        >
                            <img alt="" height={50} src="https://localzero.net/assets/itz_weiss_transp.png"/>
                        </a>
                    </Col>
                </Row>
                <Row>
                    <Col className={[styles.text, "text-center text-white"].join(" ")}>
                        <div className="align-items-top col d-flex footer-subline justify-content-center mt-3">
                            <div>LocalZero ist ein Teil von&nbsp;</div>
                            <a className="link-underline-light link-light" href="https://germanzero.de/" target="_blank">
                                GermanZero e.V.
                            </a>
                        </div>
                        <div className="align-items-top col d-flex footer-subline justify-content-center mt-3">
                            🌱Gebaut mit&nbsp;
                            <a className="link-underline-light link-light" href="https://getkirby.com/" target="_blank">
                                Kirby&nbsp;
                            </a>
                            Energie in der Schweiz durch&nbsp;
                            <a className="link-underline-light link-light" href="https://datacenterlight.ch/" target="_blank">
                                ungleich glarus ag
                            </a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

/*
import React from "react";
import "../styles/styles.css";

const Footer = () => {
    return (
        <footer className="text-uppercase text-white" id="footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 d-flex justify-content-start mb-3 mb-lg-0">
                        <div className="col px-0">
                            <ul className="list-unstyled">
                                <li><a href="https://localzero.net/loesungen">Lösungen</a></li>
                                <li><a href="https://localzero.net/ueberuns">Über uns</a></li>
                                <li><a href="https://localzero.net/mitmachen">Mitmachen</a></li>
                                <li><a href="https://localzero.net/lokalteams">Für Teams</a></li>
                            </ul>
                        </div>
                        <div className="col px-0"></div>
                    </div>
                    <div className="col-lg-8">
                        <div className="row">
                            <div className="col-md-6 justify-content-between justify-content-md-end mb-4 mt-3 social-icons"><a
                                href="https://de-de.facebook.com/GermanZero.NGO" rel="noopener nofollow" target="_blank">
                                <div className="align-items-center d-flex justify-content-center social-icon">
                                    <img
                                        alt="Facebook Logo"
                                        src="https://localzero.net/assets/icons/social/icon-social-facebook.svg"/>
                                </div>
                            </a>
                                <a href="https://www.youtube.com/channel/UCyio7GV0kpXeOu5m6Xo6A3A" rel="noopener nofollow"
                                   target="_blank">
                                    <div className="align-items-center d-flex justify-content-center social-icon">
                                        <img
                                            alt="Youtube Logo"
                                            src="https://localzero.net/assets/icons/social/icon-social-youtube.svg"/>
                                    </div>
                                </a> <a href="https://www.linkedin.com/showcase/localzero" rel="noopener nofollow"
                                        target="_blank">
                                    <div className="align-items-center d-flex justify-content-center social-icon">
                                        <img
                                            alt="LinkedIn Logo"
                                            src="https://localzero.net/assets/icons/social/icon-social-linkedin.svg"/>
                                    </div>
                                </a> <a href="https://www.instagram.com/_GermanZero/" rel="noopener nofollow" target="_blank">
                                    <div className="align-items-center d-flex justify-content-center social-icon">
                                        <img
                                            alt="Instagram Logo"
                                            src="https://localzero.net/assets/icons/social/icon-social-instagram.svg"/>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="row">
                            <div
                                className="align-items-center col-md-6 d-flex flex-md-nowrap flex-wrap justify-content-between legal mb-3">
                                <a href="https://localzero.net/kontakt">Kontakt</a>
                                <a href="https://localzero.net/impressum">Impressum</a>
                                <a href="https://localzero.net/datenschutz">Datenschutz</a>
                            </div>
                            <div className="col-md-6 d-flex justify-content-center justify-content-lg-end mb-3">
                                <a href="https://www.transparency.de/" rel="noopener nofollow" target="_blank">
                                    <img alt="" src="https://localzero.net/assets/itz_weiss_transp.png"
                                         style={{maxHeight: "50px"}}/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="align-items-top col d-flex footer-subline justify-content-center mt-3"> LocalZero ist ein Teil
                        von&nbsp;
                        <a href="https://www.germanzero.de" rel="noopener noreferrer nofollow" target="_blank">Germanzero e.V.</a>
                    </div>
                </div>
                <div className="row">
                    <div className="align-items-top col d-flex footer-subline justify-content-center mt-3">
                        <div>🌱</div>
                        <div> Gebaut mit
                            <a href="https://getkirby.com/" target="_blank">Kirby</a>, gehostet mit 100% erneuerbarer
                            Energie in der Schweiz durch
                            <a href="https://datacenterlight.ch/" target="_blank">ungleich glarus ag</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

 */