# Realtime Chat Application - Requirements & Test Specifications

## Features: Search, Edit Profile, View Profile

---

# 1. Requirement Specifications

## 1.1 Search Feature (SEARCH)

### SEARCH-REQ-001: Search Input Field

- **Description**: The system shall provide a search input field in the chat list section.
- **Acceptance Criteria**:
  - Search input field is visible and accessible
  - Placeholder text "Search" is displayed
  - Search icon is displayed next to the input field

### SEARCH-REQ-002: Real-time Search

- **Description**: The system shall perform real-time search as the user types.
- **Acceptance Criteria**:
  - Search results update as user types (no submit button required)
  - Search is case-insensitive
  - Minimum character requirement: 1 character

### SEARCH-REQ-003: Search Direct Messages

- **Description**: The system shall allow users to search through their direct message contacts.
- **Acceptance Criteria**:
  - Search matches contact first name, last name, or email
  - Only existing DM contacts are searched
  - Results display under "Direct Messages" category

### SEARCH-REQ-004: Search Groups

- **Description**: The system shall allow users to search through their groups.
- **Acceptance Criteria**:
  - Search matches group name
  - Only user's groups are searched
  - Results display under "Groups" category

### SEARCH-REQ-005: Search Results Display

- **Description**: The system shall display search results in a categorized manner.
- **Acceptance Criteria**:
  - Groups are displayed first under "Groups" label
  - Direct messages are displayed under "Direct Messages" label
  - Empty search shows all contacts and groups

### SEARCH-REQ-006: Clear Search / Go Back

- **Description**: The system shall allow users to clear search and return to full list.
- **Acceptance Criteria**:
  - Back arrow appears when search is active
  - Clicking back arrow clears search input
  - Full contact/group list is restored

### SEARCH-REQ-007: Filter Integration

- **Description**: The system shall integrate search with existing filters (All, DMs, Groups).
- **Acceptance Criteria**:
  - Filters are hidden during active search
  - Search respects current filter selection before searching

---

## 1.2 Edit Profile Feature (EDIT)

### EDIT-REQ-001: Access Edit Profile

- **Description**: The system shall allow users to access their profile editing section.
- **Acceptance Criteria**:
  - User can click on avatar icon in left sidebar
  - Profile section opens in the chat list area
  - "Profile" heading is displayed

### EDIT-REQ-002: Display Current Profile Information

- **Description**: The system shall display current user profile information.
- **Acceptance Criteria**:
  - Current profile image (or default avatar) is displayed
  - Current email is displayed (disabled/read-only)
  - Current first name is pre-filled
  - Current last name is pre-filled

### EDIT-REQ-003: Edit First Name

- **Description**: The system shall allow users to edit their first name.
- **Acceptance Criteria**:
  - First name input field is editable
  - Placeholder "First Name" is shown when empty
  - Changes are reflected in real-time in the input

### EDIT-REQ-004: Edit Last Name

- **Description**: The system shall allow users to edit their last name.
- **Acceptance Criteria**:
  - Last name input field is editable
  - Placeholder "Last Name" is shown when empty
  - Changes are reflected in real-time in the input

### EDIT-REQ-005: Profile Image Upload

- **Description**: The system shall allow users to upload a profile image.
- **Acceptance Criteria**:
  - Clicking profile image opens file picker
  - Supported formats: PNG, JPEG, JPG, SVG, WEBP, JFIF
  - Maximum file size: 10MB
  - Upload progress is displayed during upload

### EDIT-REQ-006: Save Profile Changes

- **Description**: The system shall allow users to save their profile changes.
- **Acceptance Criteria**:
  - "Save Changes" button is visible
  - Button is disabled when first name or last name is empty
  - Success toast message displayed on successful save
  - Profile is updated in the system

### EDIT-REQ-007: Validation

- **Description**: The system shall validate profile fields before saving.
- **Acceptance Criteria**:
  - First name is required (error toast if empty)
  - Last name is required (error toast if empty)
  - Error messages are displayed via toast notifications

### EDIT-REQ-008: Logout

- **Description**: The system shall allow users to logout from profile section.
- **Acceptance Criteria**:
  - Logout button is visible in profile section
  - Clicking logout redirects to authentication page
  - User session is cleared

---

## 1.3 View Profile Feature (VIEW)

### VIEW-REQ-001: View Own Profile

- **Description**: The system shall allow users to view their own profile.
- **Acceptance Criteria**:
  - User profile is accessible via avatar icon in sidebar
  - Profile image is displayed
  - Email, first name, and last name are visible

### VIEW-REQ-002: View Contact Profile

- **Description**: The system shall allow users to view a contact's profile.
- **Acceptance Criteria**:
  - Contact profile shows profile image (or default avatar)
  - Contact's full name is displayed as heading
  - Contact email is displayed
  - Groups in common are listed

### VIEW-REQ-003: View Group Profile

- **Description**: The system shall allow users to view a group's profile.
- **Acceptance Criteria**:
  - Group name is displayed as heading
  - Group icon is displayed
  - Group creation date is shown
  - Group members list is displayed

### VIEW-REQ-004: Shared Files Display

- **Description**: The system shall display shared files in contact/group profile.
- **Acceptance Criteria**:
  - "Shared files" section is visible
  - Images are displayed as thumbnails
  - Non-image files show file icon and name
  - Download option is available for files

### VIEW-REQ-005: Groups in Common (Contact)

- **Description**: The system shall display groups in common with a contact.
- **Acceptance Criteria**:
  - "Groups in common" section is visible for contacts
  - List of shared groups is displayed
  - Shows "no groups in common" if none exist

### VIEW-REQ-006: Group Members (Group)

- **Description**: The system shall display group members for a group profile.
- **Acceptance Criteria**:
  - "Group members" section is visible for groups
  - All members are listed
  - Current user is displayed as "You"

---

# 2. Test Scenarios

## 2.1 Search Feature Test Scenarios

### TS-SEARCH-001: Verify Search Input Field Display

- **Test Description**: Verify that the search input field is displayed with correct placeholder and icon.
- **Preconditions**:
  - User is logged in
  - User is on the chat page (/chat)
  - Chat icon is active in left sidebar
- **Steps**:
  1. Navigate to chat page
  2. Observe the search input field in the header area
- **Expected Results**:
  - Search input field is visible
  - Placeholder text shows "Search"
  - Search icon (magnifying glass) is displayed

### TS-SEARCH-002: Search for Direct Message Contact

- **Test Description**: Verify that users can search for DM contacts by name.
- **Preconditions**:
  - User is logged in
  - User has existing DM contacts
  - User is on the chat page
- **Steps**:
  1. Click on the search input field
  2. Type a contact's first name or last name
  3. Observe the search results
- **Expected Results**:
  - Search results update in real-time
  - Matching contacts appear under "Direct Messages"
  - Non-matching contacts are filtered out

### TS-SEARCH-003: Search for Groups

- **Test Description**: Verify that users can search for groups by group name.
- **Preconditions**:
  - User is logged in
  - User is a member of at least one group
  - User is on the chat page
- **Steps**:
  1. Click on the search input field
  2. Type a group name
  3. Observe the search results
- **Expected Results**:
  - Search results update in real-time
  - Matching groups appear under "Groups"
  - Non-matching groups are filtered out

### TS-SEARCH-004: Search with No Results

- **Test Description**: Verify behavior when search yields no results.
- **Preconditions**:
  - User is logged in
  - User is on the chat page
- **Steps**:
  1. Click on the search input field
  2. Type a random string that doesn't match any contact/group
  3. Observe the search results
- **Expected Results**:
  - No contacts or groups are displayed
  - Chat list area shows empty results

### TS-SEARCH-005: Clear Search Using Back Arrow

- **Test Description**: Verify that back arrow clears search and restores full list.
- **Preconditions**:
  - User is logged in
  - User is on the chat page
  - User has performed a search
- **Steps**:
  1. Type a search term in the search input
  2. Verify back arrow appears
  3. Click the back arrow
- **Expected Results**:
  - Search input is cleared
  - Back arrow changes to search icon
  - Full contact and group list is restored

### TS-SEARCH-006: Search Case Insensitivity

- **Test Description**: Verify that search is case-insensitive.
- **Preconditions**:
  - User is logged in
  - User has a contact named "John"
- **Steps**:
  1. Type "john" (lowercase) in search
  2. Observe results
  3. Clear search
  4. Type "JOHN" (uppercase) in search
  5. Observe results
- **Expected Results**:
  - Both searches return the same contact "John"

### TS-SEARCH-007: Filters Hidden During Search

- **Test Description**: Verify that filter buttons are hidden during active search.
- **Preconditions**:
  - User is logged in
  - User is on the chat page
- **Steps**:
  1. Verify filters (All, DMs, Groups) are visible
  2. Type a search term
  3. Observe the filter buttons
- **Expected Results**:
  - Filter buttons have "searching" class applied
  - Filters are visually hidden during search

---

## 2.2 Edit Profile Feature Test Scenarios

### TS-EDIT-001: Access Profile Section

- **Test Description**: Verify that users can access their profile by clicking avatar.
- **Preconditions**:
  - User is logged in
  - User is on the chat page
- **Steps**:
  1. Click on avatar icon in the left sidebar (bottom)
  2. Observe the chat list area
- **Expected Results**:
  - Profile section is displayed
  - "Profile" heading is visible
  - Avatar icon shows active state

### TS-EDIT-002: Display Current Profile Information

- **Test Description**: Verify that current profile information is displayed correctly.
- **Preconditions**:
  - User is logged in with complete profile
  - User navigates to profile section
- **Steps**:
  1. Click on avatar icon
  2. Observe the displayed information
- **Expected Results**:
  - Profile image (or default) is displayed
  - Email field shows user's email
  - First name field shows current first name
  - Last name field shows current last name

### TS-EDIT-003: Email Field is Read-Only

- **Test Description**: Verify that email field cannot be edited.
- **Preconditions**:
  - User is logged in
  - User is in profile section
- **Steps**:
  1. Click on avatar icon to open profile
  2. Try to click/edit the email field
- **Expected Results**:
  - Email field is disabled
  - Email field has "disabled" class
  - User cannot modify email

### TS-EDIT-004: Edit First Name Successfully

- **Test Description**: Verify that users can edit their first name.
- **Preconditions**:
  - User is logged in
  - User is in profile section
- **Steps**:
  1. Click on avatar icon to open profile
  2. Clear the first name field
  3. Type a new first name
  4. Click "Save Changes"
- **Expected Results**:
  - First name field accepts input
  - Success toast message appears
  - Profile is updated

### TS-EDIT-005: Edit Last Name Successfully

- **Test Description**: Verify that users can edit their last name.
- **Preconditions**:
  - User is logged in
  - User is in profile section
- **Steps**:
  1. Click on avatar icon to open profile
  2. Clear the last name field
  3. Type a new last name
  4. Click "Save Changes"
- **Expected Results**:
  - Last name field accepts input
  - Success toast message appears
  - Profile is updated

### TS-EDIT-006: Save Button Disabled When First Name Empty

- **Test Description**: Verify Save Changes button is disabled when first name is empty.
- **Preconditions**:
  - User is logged in
  - User is in profile section
- **Steps**:
  1. Click on avatar icon to open profile
  2. Clear the first name field
  3. Observe the Save Changes button
- **Expected Results**:
  - Save Changes button has "button-disabled" class
  - Button appears visually disabled

### TS-EDIT-007: Save Button Disabled When Last Name Empty

- **Test Description**: Verify Save Changes button is disabled when last name is empty.
- **Preconditions**:
  - User is logged in
  - User is in profile section
- **Steps**:
  1. Click on avatar icon to open profile
  2. Clear the last name field
  3. Observe the Save Changes button
- **Expected Results**:
  - Save Changes button has "button-disabled" class
  - Button appears visually disabled

### TS-EDIT-008: Validation Error for Empty First Name

- **Test Description**: Verify error toast when saving with empty first name.
- **Preconditions**:
  - User is logged in
  - User is in profile section
- **Steps**:
  1. Click on avatar icon to open profile
  2. Clear the first name field
  3. Ensure last name has a value
  4. Click Save Changes (if enabled) or trigger save
- **Expected Results**:
  - Error toast appears with "First name is required"
  - Profile is not saved

### TS-EDIT-009: Validation Error for Empty Last Name

- **Test Description**: Verify error toast when saving with empty last name.
- **Preconditions**:
  - User is logged in
  - User is in profile section with first name filled
- **Steps**:
  1. Click on avatar icon to open profile
  2. Clear the last name field
  3. Ensure first name has a value
  4. Click Save Changes (if enabled) or trigger save
- **Expected Results**:
  - Error toast appears with "Last name is required"
  - Profile is not saved

### TS-EDIT-010: Profile Image Click Opens File Picker

- **Test Description**: Verify that clicking profile image opens file selector.
- **Preconditions**:
  - User is logged in
  - User is in profile section
- **Steps**:
  1. Click on avatar icon to open profile
  2. Click on the profile image
- **Expected Results**:
  - File input is triggered
  - File picker dialog would open (native browser)

### TS-EDIT-011: Logout Functionality

- **Test Description**: Verify that logout button redirects to auth page.
- **Preconditions**:
  - User is logged in
  - User is in profile section
- **Steps**:
  1. Click on avatar icon to open profile
  2. Click on "Logout" button
- **Expected Results**:
  - User is redirected to /auth page
  - User session is cleared

---

## 2.3 View Profile Feature Test Scenarios

### TS-VIEW-001: View Own Profile Details

- **Test Description**: Verify user can view their own profile details.
- **Preconditions**:
  - User is logged in
- **Steps**:
  1. Click on avatar icon in left sidebar
  2. Observe profile information
- **Expected Results**:
  - Profile section displays user's image
  - Email is displayed
  - First name is displayed
  - Last name is displayed

### TS-VIEW-002: View Contact Profile - Image Display

- **Test Description**: Verify contact profile displays profile image correctly.
- **Preconditions**:
  - User is logged in
  - User has selected a contact chat
  - Contact or Group Profile view is active
- **Steps**:
  1. Open a contact chat
  2. Navigate to contact profile view
  3. Observe the profile image
- **Expected Results**:
  - Contact's profile image is displayed
  - If no image, default avatar SVG is shown

### TS-VIEW-003: View Contact Profile - Contact Information

- **Test Description**: Verify contact's information is displayed correctly.
- **Preconditions**:
  - User is logged in
  - Contact profile is being viewed
- **Steps**:
  1. Navigate to contact profile view
  2. Observe the contact information
- **Expected Results**:
  - Contact's full name is displayed as heading
  - "Contact:" label is shown
  - First name, last name, and email are displayed

### TS-VIEW-004: View Groups in Common

- **Test Description**: Verify groups in common section for contact profile.
- **Preconditions**:
  - User is logged in
  - User is viewing a contact profile
- **Steps**:
  1. Navigate to contact profile view
  2. Scroll to "Groups in common" section
- **Expected Results**:
  - "Groups in common:" label is visible
  - List of shared groups is displayed, OR
  - "no groups in common" text if none exist

### TS-VIEW-005: View Group Profile - Group Name

- **Test Description**: Verify group profile displays group name correctly.
- **Preconditions**:
  - User is logged in
  - User is viewing a group profile
- **Steps**:
  1. Open a group chat
  2. Navigate to group profile view
  3. Observe the heading
- **Expected Results**:
  - Group name is displayed as h1 heading

### TS-VIEW-006: View Group Profile - Creation Date

- **Test Description**: Verify group profile displays creation date.
- **Preconditions**:
  - User is logged in
  - User is viewing a group profile
- **Steps**:
  1. Navigate to group profile view
  2. Observe the "Created at" section
- **Expected Results**:
  - "Created at:" label is visible
  - Date is displayed in localized format

### TS-VIEW-007: View Group Members

- **Test Description**: Verify group members list is displayed correctly.
- **Preconditions**:
  - User is logged in
  - User is viewing a group profile
- **Steps**:
  1. Navigate to group profile view
  2. Observe the "Group members" section
- **Expected Results**:
  - "Group members:" label is visible
  - All group members are listed
  - Current user is shown as "You"

### TS-VIEW-008: View Shared Files Section

- **Test Description**: Verify shared files section is displayed.
- **Preconditions**:
  - User is logged in
  - User is viewing a contact or group profile
- **Steps**:
  1. Navigate to contact/group profile view
  2. Observe the "Shared files" section
- **Expected Results**:
  - "Shared files:" label is visible
  - Files are displayed if any exist, OR
  - "no shared files" text if none exist

### TS-VIEW-009: Shared Images Display as Thumbnails

- **Test Description**: Verify shared images are displayed as thumbnails.
- **Preconditions**:
  - User is logged in
  - User is viewing a profile with shared image files
- **Steps**:
  1. Navigate to profile with shared images
  2. Observe the shared files section
- **Expected Results**:
  - Images are displayed in image-container
  - Images are shown as thumbnails

### TS-VIEW-010: Non-Image Files Display with Icon

- **Test Description**: Verify non-image files show file icon and name.
- **Preconditions**:
  - User is logged in
  - User is viewing a profile with shared non-image files
- **Steps**:
  1. Navigate to profile with shared files
  2. Observe non-image files
- **Expected Results**:
  - File icon (folder zip) is displayed
  - File name is shown (truncated if too long)
  - Download button is visible

---

# 3. Test Cases (Table Format)

## 3.1 Search Feature Test Cases

| Test Case ID  | Test Scenario | Test Description                       | Preconditions                                | Test Steps                                  | Test Data                       | Expected Result                                       | Priority |
| ------------- | ------------- | -------------------------------------- | -------------------------------------------- | ------------------------------------------- | ------------------------------- | ----------------------------------------------------- | -------- |
| TC-SEARCH-001 | TS-SEARCH-001 | Verify search input field is displayed | User logged in, on /chat page                | 1. Navigate to /chat 2. Observe search area | N/A                             | Search input with placeholder "Search" is visible     | High     |
| TC-SEARCH-002 | TS-SEARCH-001 | Verify search icon is displayed        | User logged in, on /chat page                | 1. Navigate to /chat 2. Observe search icon | N/A                             | Magnifying glass icon is visible next to search input | High     |
| TC-SEARCH-003 | TS-SEARCH-002 | Search DM contact by first name        | User logged in, has contact "John"           | 1. Type "John" in search input              | searchTerm: "John"              | Contact "John" appears in Direct Messages section     | High     |
| TC-SEARCH-004 | TS-SEARCH-002 | Search DM contact by email             | User logged in, has contact with email       | 1. Type part of contact email in search     | searchTerm: "test@"             | Matching contact appears in results                   | Medium   |
| TC-SEARCH-005 | TS-SEARCH-003 | Search group by name                   | User logged in, member of "Developers" group | 1. Type "Dev" in search input               | searchTerm: "Dev"               | "Developers" group appears in Groups section          | High     |
| TC-SEARCH-006 | TS-SEARCH-004 | Search with non-existent term          | User logged in                               | 1. Type "xyz123nonexistent" in search       | searchTerm: "xyz123nonexistent" | No results displayed, empty list                      | Medium   |
| TC-SEARCH-007 | TS-SEARCH-005 | Verify back arrow clears search        | User logged in, search active                | 1. Type search term 2. Click back arrow     | N/A                             | Search cleared, full list restored, search icon shows | High     |
| TC-SEARCH-008 | TS-SEARCH-006 | Search is case insensitive - lowercase | User logged in, has contact "John"           | 1. Type "john" (lowercase)                  | searchTerm: "john"              | Contact "John" is found                               | Medium   |
| TC-SEARCH-009 | TS-SEARCH-006 | Search is case insensitive - uppercase | User logged in, has contact "John"           | 1. Type "JOHN" (uppercase)                  | searchTerm: "JOHN"              | Contact "John" is found                               | Medium   |
| TC-SEARCH-010 | TS-SEARCH-007 | Filters hidden during search           | User logged in, on /chat page                | 1. Type any search term 2. Observe filters  | N/A                             | Filters div has "searching" class                     | Low      |

## 3.2 Edit Profile Feature Test Cases

| Test Case ID | Test Scenario | Test Description                        | Preconditions                        | Test Steps                                      | Test Data                           | Expected Result                                  | Priority |
| ------------ | ------------- | --------------------------------------- | ------------------------------------ | ----------------------------------------------- | ----------------------------------- | ------------------------------------------------ | -------- |
| TC-EDIT-001  | TS-EDIT-001   | Access profile section via avatar       | User logged in, on /chat page        | 1. Click avatar icon in left sidebar            | N/A                                 | Profile section opens, "Profile" heading visible | High     |
| TC-EDIT-002  | TS-EDIT-002   | Display current user email              | User logged in, in profile section   | 1. Open profile 2. Observe email field          | N/A                                 | User's email is displayed in disabled input      | High     |
| TC-EDIT-003  | TS-EDIT-002   | Display current first name              | User logged in with firstName "John" | 1. Open profile 2. Observe first name field     | N/A                                 | "John" is displayed in first name input          | High     |
| TC-EDIT-004  | TS-EDIT-002   | Display current last name               | User logged in with lastName "Doe"   | 1. Open profile 2. Observe last name field      | N/A                                 | "Doe" is displayed in last name input            | High     |
| TC-EDIT-005  | TS-EDIT-003   | Email field is disabled                 | User logged in, in profile section   | 1. Open profile 2. Check email input attributes | N/A                                 | Email input has disabled attribute               | High     |
| TC-EDIT-006  | TS-EDIT-004   | Edit first name field                   | User logged in, in profile section   | 1. Clear first name 2. Type "NewName"           | firstName: "NewName"                | Input shows "NewName"                            | High     |
| TC-EDIT-007  | TS-EDIT-005   | Edit last name field                    | User logged in, in profile section   | 1. Clear last name 2. Type "NewLast"            | lastName: "NewLast"                 | Input shows "NewLast"                            | High     |
| TC-EDIT-008  | TS-EDIT-006   | Save button disabled - empty first name | User logged in, in profile section   | 1. Clear first name field                       | firstName: ""                       | Save button has "button-disabled" class          | High     |
| TC-EDIT-009  | TS-EDIT-007   | Save button disabled - empty last name  | User logged in, in profile section   | 1. Clear last name field                        | lastName: ""                        | Save button has "button-disabled" class          | High     |
| TC-EDIT-010  | TS-EDIT-004   | Save profile changes successfully       | User logged in, valid data entered   | 1. Enter valid first/last name 2. Click Save    | firstName: "Test", lastName: "User" | Success toast "Profile updated successfully"     | High     |
| TC-EDIT-011  | TS-EDIT-010   | Profile image click triggers file input | User logged in, in profile section   | 1. Click on profile image area                  | N/A                                 | Hidden file input is triggered                   | Medium   |
| TC-EDIT-012  | TS-EDIT-011   | Logout redirects to auth page           | User logged in, in profile section   | 1. Click Logout button                          | N/A                                 | User redirected to /auth page                    | High     |
| TC-EDIT-013  | TS-EDIT-002   | Profile image displays when set         | User logged in with profile image    | 1. Open profile 2. Observe image                | N/A                                 | Profile image is visible                         | Medium   |
| TC-EDIT-014  | TS-EDIT-002   | Default avatar when no image            | User logged in without profile image | 1. Open profile 2. Observe image area           | N/A                                 | Default SVG avatar is displayed                  | Medium   |

## 3.3 View Profile Feature Test Cases

| Test Case ID | Test Scenario | Test Description                    | Preconditions                                   | Test Steps                                             | Test Data               | Expected Result                          | Priority |
| ------------ | ------------- | ----------------------------------- | ----------------------------------------------- | ------------------------------------------------------ | ----------------------- | ---------------------------------------- | -------- |
| TC-VIEW-001  | TS-VIEW-001   | View own profile - heading          | User logged in                                  | 1. Click avatar icon                                   | N/A                     | "Profile" heading is displayed           | High     |
| TC-VIEW-002  | TS-VIEW-002   | View contact profile image          | User viewing contact profile                    | 1. Navigate to contact profile                         | N/A                     | Contact's image or default avatar shown  | Medium   |
| TC-VIEW-003  | TS-VIEW-003   | View contact name as heading        | User viewing contact profile                    | 1. Navigate to contact profile                         | contactName: "John Doe" | "John Doe" displayed as heading          | High     |
| TC-VIEW-004  | TS-VIEW-003   | View contact email                  | User viewing contact profile                    | 1. Navigate to contact profile 2. Check contact info   | N/A                     | Contact email is displayed               | High     |
| TC-VIEW-005  | TS-VIEW-004   | View groups in common - with groups | User viewing contact profile, has shared groups | 1. Navigate to contact profile 2. Check groups section | N/A                     | List of shared groups displayed          | Medium   |
| TC-VIEW-006  | TS-VIEW-004   | View groups in common - no groups   | User viewing contact profile, no shared groups  | 1. Navigate to contact profile 2. Check groups section | N/A                     | "no groups in common" text displayed     | Medium   |
| TC-VIEW-007  | TS-VIEW-005   | View group name as heading          | User viewing group profile                      | 1. Navigate to group profile                           | groupName: "Developers" | "Developers" displayed as heading        | High     |
| TC-VIEW-008  | TS-VIEW-006   | View group creation date            | User viewing group profile                      | 1. Navigate to group profile 2. Check created at       | N/A                     | "Created at:" label with date visible    | Medium   |
| TC-VIEW-009  | TS-VIEW-007   | View group members list             | User viewing group profile                      | 1. Navigate to group profile 2. Check members          | N/A                     | "Group members:" label with member list  | High     |
| TC-VIEW-010  | TS-VIEW-007   | Current user shown as "You"         | User viewing group profile they belong to       | 1. Navigate to group profile 2. Find self in members   | N/A                     | Current user displayed as "You"          | Medium   |
| TC-VIEW-011  | TS-VIEW-008   | View shared files section           | User viewing any profile                        | 1. Navigate to profile 2. Check shared files           | N/A                     | "Shared files:" section is visible       | Medium   |
| TC-VIEW-012  | TS-VIEW-008   | No shared files message             | User viewing profile with no shared files       | 1. Navigate to profile 2. Check shared files           | N/A                     | "no shared files" text displayed         | Low      |
| TC-VIEW-013  | TS-VIEW-009   | Shared images as thumbnails         | User viewing profile with shared images         | 1. Navigate to profile 2. Check images                 | N/A                     | Images displayed in image-container divs | Medium   |
| TC-VIEW-014  | TS-VIEW-010   | Non-image files with download       | User viewing profile with shared files          | 1. Navigate to profile 2. Check file download          | N/A                     | Download icon is clickable               | Medium   |

---

# 4. Cypress Code

See the file `cypress/e2e/chat-features.cy.js` for the complete Cypress test implementation.
