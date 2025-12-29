# TODO: Make Orders Page Responsive

- [x] Update header layout to stack vertically on small screens and horizontally on larger screens
- [x] Make tabs responsive with better spacing on mobile
- [x] Adjust order cards: stack content vertically on mobile, make buttons full-width or adjust layout
- [x] Use Tailwind responsive prefixes (sm:, md:, lg:) for breakpoints
- [ ] Test the page on different screen sizes to ensure responsiveness

# TODO: Implement Services Module in Settings

- [x] Add "Services" link to Account Settings in app/customer/settings/page.tsx
- [x] Add "Become a Student" and "Become a Worker" upgrade options to settings page
- [x] Create main services page at app/customer/settings/services/page.tsx with role-based options
- [x] Create student services page at app/customer/settings/services/student/page.tsx with categories and profile creation
- [x] Create worker services page at app/customer/settings/services/worker/page.tsx with categories and registration
- [x] Implement role-based visibility (Students: only student services, Workers: only worker services, Employers: both)
- [x] Add employer access to manage both student and worker services
- [x] Add admin controls in app/secret-admin-portal/page.tsx for viewing profiles, approving/blocking services, monitoring assignments
- [x] Test role-based access and navigation
