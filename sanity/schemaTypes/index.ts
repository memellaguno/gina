// import page from "./page";
import person from "./documents/person";
import page from "./documents/page";
import post from "./documents/post";
import callToAction from "./blocks/callToActionType";
import infoSection from "./objects/infoSection";
import settings from "./singletons/settings";
import link from "./objects/link";
import blockContent from "./objects/blockContent";
import heroType from "./blocks/heroType";
import tabsType from "./blocks/tabsType";
import galleryType from "./blocks/galleryType";
import paragraphType from "./blocks/paragraphType";
import textAndImageType from "./blocks/textAndImageType";
import styleSettings from "./singletons/styleSettings";
import header from "./singletons/header";
import navLink from "./objects/navLink";
import formType from "./blocks/formType";
import metricsType from "./blocks/metricsType";
import accordionType from "./blocks/accordionType";
import testBlockType from "./blocks/testBlockType";
import projects from "./objects/projects";
import photoGallery from "./objects/photoGallery";
import imagesCarousel from "./blocks/imagesCarouselType";
import productBlock from "./blocks/productBlockType";
import products from "./documents/products";
import tabsDoubleImage from "./blocks/tabsDoubleImageType";
import stepsType from "./blocks/stepsType";
import miniGalleriesType from "./blocks/miniGalleriesType";
import productDetailsType from "./blocks/productDetailsType";
import documentationType from "./blocks/documentationType";
// Gina specific blocks
import heroHomeType from "./blocks/heroHomeType";
import heroAboutType from "./blocks/heroAboutType";
import introTextType from "./blocks/introTextType";
import videoGalleryType from "./blocks/videoGalleryType";
import featuredInitiativeType from "./blocks/featuredInitiativeType";
import logoMarqueeType from "./blocks/logoMarqueeType";
import ctaBannerType from "./blocks/ctaBannerType";
import imageSliderType from "./blocks/imageSliderType";
import logoGridType from "./blocks/logoGridType";
import awardsAccordionType from "./blocks/awardsAccordionType";
import initiativesAccordionType from "./blocks/initiativesAccordionType";
import publishingType from "./blocks/publishingType";
import quoteType from "./blocks/quoteType";

export const schemaTypes = [
  // Singletons
  settings,
  styleSettings,
  header,
  // Documents
  page,
  post,
  person,
  products,
  // Objects
  blockContent,
  infoSection,
  callToAction,
  link,
  navLink,
  projects,
  photoGallery,
  // Existing Blocks
  formType,
  galleryType,
  heroType,
  paragraphType,
  tabsDoubleImage,
  textAndImageType,
  metricsType,
  accordionType,
  testBlockType,
  imagesCarousel,
  productBlock,
  stepsType,
  miniGalleriesType,
  productDetailsType,
  documentationType,
  // Gina specific blocks
  heroHomeType,
  heroAboutType,
  introTextType,
  videoGalleryType,
  featuredInitiativeType,
  logoMarqueeType,
  ctaBannerType,
  imageSliderType,
  logoGridType,
  awardsAccordionType,
  initiativesAccordionType,
  publishingType,
  quoteType,
];
