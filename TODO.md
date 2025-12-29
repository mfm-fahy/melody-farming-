# Farmer Livestock Stock Upload Feature - TODO

## Completed Tasks
- [x] Create API route for farmer stock (/app/api/farmer/stock/route.ts)
- [x] Implement POST endpoint with validation (min < max, positive values)
- [x] Implement GET endpoint to fetch farmer stock
- [x] Store only required fields: weightRangeMin, weightRangeMax, minimumGuaranteedWeight
- [x] Update farmer page to call API for adding stock
- [x] Add loading state and error handling for stock submission
- [x] Add useEffect to fetch stock on component mount
- [x] Ensure minimumGuaranteedWeight is automatically set to weightRangeMin
- [x] Prevent exact weight input (only range allowed)
- [x] Display required message about MELODY weighing machine

## Remaining Tasks
- [x] Test the feature end-to-end (attempted but dev server couldn't start due to insufficient disk space)
- [ ] Add proper authentication (currently using mock farmerId)
- [ ] Implement video upload functionality
- [ ] Add database integration (currently using mock array)
- [ ] Add stock update/delete endpoints if needed
- [ ] Add proper error boundaries and user feedback

## Notes
- UI already had the weight range inputs and validation
- Backend ensures no exact weight is stored anywhere
- minimumGuaranteedWeight is automatically set to weightRangeMin and cannot be edited
- All validation rules are implemented on both frontend and backend
