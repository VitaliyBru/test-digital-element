import isSafari from "./modules/is-safari";
import svg4everybody from "svg4everybody";
import initFeedback from "./modules/init-feedback";
import "whatwg-fetch";
import test from "./modules/test";

isSafari();
svg4everybody();
initFeedback();
test();
