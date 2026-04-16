## [Unreleased]

### Added 4/16/26

- Status and priority badge styling for work orders
- Empty and loading state UI components
- README screenshots showcasing dashboard, edit mode, and error handling

### Changed 4/16/26

- Polished dashboard layout, work order cards, and action buttons
- Improved visual hierarchy and branding for portfolio presentation
- Enhanced README with feature overview, architecture explanation, and development details

### Added 4/15/26

- Edit work order functionality with reusable form component
- WorkOrderForm supporting both create and edit modes
- Fetch work order by id for edit mode
- Update work order API integration

### Fixed 4/15/26

- Corrected HTTP method for update requests (PUT instead of GET) to resolve fetch error

### Changed 4/15/26

- Refactored create form to use shared WorkOrderForm component
- Improved UI consistency across create and edit flows
- Increased logo size for stronger branding presence

### Added 4/10/26

- Styling for create form
- Screenshot folder for README.md

### Added 4/10/26

- Create work order form UI
- API integration for creating work orders
- React Query mutation for create workflow

### Fixed 4/10/26

- Added proper JSON headers for POST requests to resolve 415 error

### Changed 4/10/26

- Improved error handling for API responses

### Added 4/10/26

- Delete work order functionality in UI
- React Query mutation for deleting work orders

### Changed 4/10/26

- Improved layout and styling for work order list

### Changed 4/8/26

- README.md

### Added 4/6/26

- Work orders list page
- Work orders query hook using React Query
- HTTP client and API integration for listing work orders

### Added 4/2/26

- Initial React + TypeScript app setup using Vite
- React Query configured for server state management
- Base project structure (ui, features, domain, infra)
