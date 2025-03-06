export const IMAGE_URL = import.meta.env.VITE_APP_SPACES_URL;
// APIS
export const MANAGE_RESUME_API = "resume/";
export const MANAGE_PROJECT_API = "projects/";

export const WEBSITE_CONTENT_API = "websiteContents/";
export const APP_SETTINGS_API = WEBSITE_CONTENT_API + "appSettings/";
export const MANAGE_APP_SETTING_API = APP_SETTINGS_API + "manageAppSettings/";
export const HERO_SLIDERS_API = WEBSITE_CONTENT_API + "heroSliders/";

export const CUSTOMERS_API = "customers/";
export const MANAGE_CUSTOMERS_API = CUSTOMERS_API + "manageCustomer/";
export const MANAGE_EMPLOYEE_API = "manageEmployees/";

//AJ EXAM CENTER

// general
export const ARCHIVE_API = "archive/";
export const UNARCHIVE_API = "unarchive/";

// boards
export const MANAGE_BOARD_API = "manageBoards/boards/";
export const ARCHIVE_BOARD_API = MANAGE_BOARD_API + ARCHIVE_API;
export const UNARCHIVE_BOARD_API = MANAGE_BOARD_API + UNARCHIVE_API;

//levels
export const MANAGE_LEVEL_API = "manageLevels/levels/";
export const ARCHIVE_LEVEL_API = MANAGE_LEVEL_API + ARCHIVE_API;
export const UNARCHIVE_LEVEL_API = MANAGE_LEVEL_API + UNARCHIVE_API;

//subLevels
export const MANAGE_SUBLEVEL_API = MANAGE_LEVEL_API + "subLevels/";
export const ARCHIVE_SUBLEVEL_API = MANAGE_SUBLEVEL_API + ARCHIVE_API;
export const UNARCHIVE_SUBLEVEL_API = MANAGE_SUBLEVEL_API + UNARCHIVE_API;

export const GET_SUBLEVELS_BY_LEVEL_API = MANAGE_SUBLEVEL_API + "dropdown/";
//subjects
export const MANAGE_SUBJECT_API = "manageSubjects/subjects/";
export const ARCHIVE_SUBJECT_API =
  MANAGE_SUBJECT_API + "singleSubject/" + ARCHIVE_API;
export const UNARCHIVE_SUBJECT_API =
  MANAGE_SUBJECT_API + "singleSubject/" + UNARCHIVE_API;
export const GET_ALL_SUBJECT_API = "manageSubjects/allSubjects/";

//subjectBoardMaps
export const MANAGE_SUBJECT_BOARD_API =
  "manageSubjectBoardMaps/subjectBoardMaps/";
export const ARCHIVE_SUBJECT_BOARD_API = MANAGE_SUBJECT_BOARD_API + ARCHIVE_API;
export const UNARCHIVE_SUBJECT_BOARD_API =
  MANAGE_SUBJECT_BOARD_API + UNARCHIVE_API;
export const MANAGE_SUBJECT_BOARD_BY_SUBJECT_API =
  MANAGE_SUBJECT_BOARD_API + "subject/";
export const MANAGE_SUBJECT_BOARD_BY_BOARD_API =
  MANAGE_SUBJECT_BOARD_API + "board/";

//packages
export const MANAGE_PACKAGE_API = "managePackages/packages/";
export const ARCHIVE_PACKAGE_API = MANAGE_PACKAGE_API + ARCHIVE_API;
export const UNARCHIVE_PACKAGE_API = MANAGE_PACKAGE_API + UNARCHIVE_API;
export const PACKAGE_BY_SUBJECT_AND_BOARD =
  MANAGE_PACKAGE_API + "bySubjectAndBoard";
//venues
export const MANAGE_VENUE_API = "manageVenues/venues/";
export const ARCHIVE_VENUE_API = MANAGE_VENUE_API + ARCHIVE_API;
export const UNARCHIVE_VENUE_API = MANAGE_VENUE_API + UNARCHIVE_API;

//inquiries
export const MANAGE_INQUIRY_API = "manageInquiries/inquiries/";
// export const ARCHIVE_INQUIRY_API = MANAGE_INQUIRY_API + ARCHIVE_API;
// export const UNARCHIVE_INQUIRY_API = MANAGE_INQUIRY_API + UNARCHIVE_API;

//exam
export const MANAGE_EXAM_API = "manageExams/exams/";
export const ARCHIVE_EXAM_API = MANAGE_EXAM_API + ARCHIVE_API;
export const UNARCHIVE_EXAM_API = MANAGE_EXAM_API + UNARCHIVE_API;
//ucas&mocks
export const MANAGE_UCAS_MOCKS_API = "manageUcasMock/ucasmock/";
export const ARCHIVE_UCAS_MOCKS_API = MANAGE_UCAS_MOCKS_API + ARCHIVE_API;
export const UNARCHIVE_UCAS_MOCKS_API = MANAGE_UCAS_MOCKS_API + UNARCHIVE_API;

export const DOWNLOAD_EXAM_API = "downloadCsv/";

// applicants
export const MANAGE_APPLICANT_API = "manageApplicants/applicants/";
export const ARCHIVE_APPLICANT_API = MANAGE_APPLICANT_API + ARCHIVE_API;
export const UNARCHIVE_APPLICANT_API = MANAGE_APPLICANT_API + UNARCHIVE_API;

//testimonials
export const MANAGE_TESTIMONIAL_API = "manageTestimonials/testimonials/";
export const ARCHIVE_TESTIMONIAL_API = MANAGE_TESTIMONIAL_API + ARCHIVE_API;
export const UNARCHIVE_TESTIMONIAL_API = MANAGE_TESTIMONIAL_API + UNARCHIVE_API;
//achievement stats
export const MANAGE_STUDENT_SUCCESS_API =
  "manageStudentsuccess/studentsuccess/";
export const ARCHIVE_STUDENT_SUCCESS_API =
  MANAGE_STUDENT_SUCCESS_API + ARCHIVE_API;
export const UNARCHIVE_STUDENT_SUCCESS_API =
  MANAGE_STUDENT_SUCCESS_API + UNARCHIVE_API;

//social links
export const MANAGE_SOCIALLINK_API = "manageSociallinks/sociallinks/";
export const ARCHIVE_SOCIALLINK_API = MANAGE_SOCIALLINK_API + ARCHIVE_API;
export const UNARCHIVE_SOCIALLINK_API = MANAGE_SOCIALLINK_API + UNARCHIVE_API;

//subscribers
export const MANAGE_SUBSCRIBER_API = "manageSubscribers/subscribers/";
export const ARCHIVE_SUBSCRIBER_API = MANAGE_SUBSCRIBER_API + ARCHIVE_API;
export const UNARCHIVE_SUBSCRIBER_API = MANAGE_SUBSCRIBER_API + UNARCHIVE_API;

// contact us
export const MANAGE_CONTACT_US_API = "manageContactUs/";
export const ARCHIVE_CONTACT_US_API = MANAGE_CONTACT_US_API + ARCHIVE_API;
export const UNARCHIVE_CONTACT_US_API = MANAGE_CONTACT_US_API + UNARCHIVE_API;

// user contacts
export const MANAGE_USER_CONTACT_API = MANAGE_CONTACT_US_API + "userContacts/";

// footer contents
export const MANAGE_FOOTER_CONTENTS_API = "manageFooterContents/";
export const TIMINGS_API = MANAGE_FOOTER_CONTENTS_API + "timings/";
export const GET_IN_TOUCH_API = MANAGE_FOOTER_CONTENTS_API + "getInTouch/";
export const ARCHIVE_TIMINGS_API = TIMINGS_API + ARCHIVE_API;
export const UNARCHIVE_TIMINGS_API = TIMINGS_API + UNARCHIVE_API;

// USER SUBJECT CODE

export const USER_SUBJECT_CODE_API = "manageExams/exams/userSubjectCode/";
