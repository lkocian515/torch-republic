# Deployment Checklist: IA Cleanup
## Torch Republic Information Architecture Restructure
**Status:** READY FOR DEPLOYMENT ✅

---

## PRE-DEPLOYMENT VERIFICATION

### Code Changes ✅
- [x] NavBar.jsx — Navigation restructured
- [x] Footer.jsx — 3-column layout implemented
- [x] CoffeeCollection.jsx — Founders-focused header + apparel section added
- [x] Shop.jsx — Header updated (no URL change)

### Testing ✅
- [x] All navigation links work (desktop)
- [x] All navigation links work (mobile)
- [x] Footer links functional
- [x] Collection page links working
- [x] No 404 errors on any nav link
- [x] Responsive design verified

### Documentation ✅
- [x] IA_ARCHITECTURE_2026.md — Complete specification
- [x] LINK_AUDIT_AND_CLEANUP.md — Detailed audit
- [x] IA_CHANGES_SUMMARY.md — All changes documented
- [x] IA_VISUAL_DIAGRAMS.md — Visual reference
- [x] EXECUTIVE_SUMMARY_IA_CLEANUP.md — High-level overview
- [x] DEPLOYMENT_CHECKLIST.md — This checklist

---

## DEPLOYMENT PHASE 1: STAGING (This Week)

- [ ] Deploy code to staging environment
- [ ] QA: Test all navigation flows
  - [ ] Desktop navigation
  - [ ] Mobile menu (full-screen)
  - [ ] Footer links
  - [ ] Collection page links
  - [ ] Product page links
- [ ] Verify no layout/style issues
- [ ] Test responsive breakpoints (mobile, tablet, desktop)
- [ ] Check accessibility (keyboard nav, screen readers)
- [ ] Verify all images load properly
- [ ] Test on actual devices (not just browser dev tools)

**QA Lead:** [Name]  
**Expected Timeline:** 2-3 days  
**Sign-off:** [Approval]

---

## DEPLOYMENT PHASE 2: PRODUCTION (Week of May 5)

- [ ] Final approval from stakeholders
- [ ] Deploy to production (off-peak hours)
- [ ] Monitor server logs for errors
- [ ] Test all navigation on live site (fresh browser)
- [ ] Verify Google Analytics is tracking correctly
- [ ] Check for any JavaScript console errors

**Deployment Lead:** [Name]  
**Timeline:** 30 minutes  
**Rollback Plan:** Ready if needed (revert 3 files)

---

## POST-DEPLOYMENT: MONITORING (Week 1)

### Analytics Monitoring ✅
- [ ] Monitor navigation clicks (GA)
- [ ] Track "Shop Coffee" clicks
- [ ] Track "Torch Box" clicks
- [ ] Monitor bounce rates by page
- [ ] Check apparel page traffic (should decrease, but not disappear)

### User Feedback ✅
- [ ] Monitor customer support for nav confusion
- [ ] Check social media for feedback
- [ ] Collect internal feedback from team

### Bug Fixes ✅
- [ ] Fix any reported issues
- [ ] Iterate on CTA placement if needed
- [ ] Adjust copy if confusion detected

**Monitoring Lead:** [Name]  
**Timeline:** Ongoing, daily check for Week 1

---

## FUTURE WORK (Post-Launch)

### Phase 3A: Apparel Sections (Week of May 12)
- [ ] Add "Extend Your Collection" section to LibertyIcons.jsx
- [ ] Add "Extend Your Collection" section to CommandersSeries.jsx
- [ ] Test apparel section links
- [ ] Verify consistent styling with Founders page

### Phase 3B: Women of the Republic (When Products Ready)
- [ ] Add Women of the Republic to nav (when products confirmed)
- [ ] Add matching apparel section
- [ ] Verify all internal links

### Phase 4: Optimization (June 2026)
- [ ] Analyze conversion data
- [ ] A/B test CTA placement (if needed)
- [ ] Optimize collection page copy based on user behavior
- [ ] Improve mobile experience (if issues found)

---

## ROLLBACK PLAN (If Needed)

**Estimated Rollback Time:** <5 minutes

**Steps:**
1. SSH into production server
2. Revert these 3 files to previous commit:
   - `components/navigation/NavBar.jsx`
   - `components/navigation/Footer.jsx`
   - `pages/CoffeeCollection.jsx`
3. Rebuild/redeploy
4. Verify links work

**Rollback Triggers:**
- Critical bug in navigation (makes site unusable)
- Major link breakage (404 errors on primary paths)
- Performance regression (page load >2s slower)

**Rollback Approval:** [Manager Name]

---

## SIGN-OFF

### Code Review
- [ ] Code reviewed by: [Reviewer Name]
- [ ] Approved on: [Date]
- [ ] Comments: [Any notes]

### QA Approval
- [ ] QA lead: [Name]
- [ ] All tests passed
- [ ] Ready for production: [ ] YES [ ] NO

### Business Approval
- [ ] Brand team: [Name]
- [ ] Confirms coffee-first positioning
- [ ] Approved: [ ] YES [ ] NO

### Final Approval
- [ ] Project manager: [Name]
- [ ] All green lights received
- [ ] Approved for deployment: [ ] YES [ ] NO

---

## COMMUNICATION PLAN

### Internal (Before Deployment)
- [ ] Notify team slack channel
- [ ] Share executive summary with stakeholders
- [ ] Hold brief sync (15 min) to explain changes

### Customer-Facing (Optional)
- [ ] No announcement needed (internal changes only)
- [ ] Site looks/functions same to users (cleaner nav)
- [ ] Better user experience (clearer coffee-first positioning)

### Post-Deployment
- [ ] Share metrics dashboard with team
- [ ] Weekly sync on traffic/conversion data
- [ ] Monthly review of brand perception

---

## LAUNCH DAY CHECKLIST (Production)

**Time:** [TBD - Recommend Tuesday-Thursday, 3-5pm]  
**Duration:** 30 minutes  
**Rollback Plan:** Ready (see above)

### 30 Min Before
- [ ] Notify team via Slack
- [ ] Clear browser cache
- [ ] Open staging site in incognito (test fresh)
- [ ] Have rollback terminal ready

### During Deployment
- [ ] Execute git merge/deploy
- [ ] Monitor server logs for errors
- [ ] Refresh live site
- [ ] Test 3 key flows:
  - [ ] Home → Shop Coffee → Founders → Product
  - [ ] Mobile menu opens correctly
  - [ ] Footer links work
- [ ] No console errors

### 30 Min After
- [ ] Verify GA is tracking
- [ ] Final smoke test on mobile/desktop
- [ ] Close deployment window
- [ ] Announce success to team

### End of Day
- [ ] Monitor support channels
- [ ] Check for customer issues
- [ ] Share day-1 metrics

---

## SUCCESS CRITERIA

✅ Deployment is successful if:
- All navigation links work (0 broken links)
- No layout/styling issues
- Mobile menu functions correctly
- Footer displays properly
- Analytics tracking works
- No 404 errors on production
- No spike in error logs
- Customer support receives no nav confusion issues

---

## ISSUE TRACKING

**Template for any issues found:**
```
ISSUE: [Brief description]
SEVERITY: [Critical/High/Medium/Low]
AFFECTED: [Which page/component]
REPRODUCTION: [Steps to reproduce]
SOLUTION: [How to fix]
STATUS: [New/In Progress/Resolved]
```

**Issue Log:** (To be created in deployment week)

---

## DOCUMENTATION REFERENCES

For detailed information, see:
- **EXECUTIVE_SUMMARY_IA_CLEANUP.md** — High-level overview
- **IA_ARCHITECTURE_2026.md** — Complete specification
- **LINK_AUDIT_AND_CLEANUP.md** — Detailed changes
- **IA_CHANGES_SUMMARY.md** — Before/after comparison
- **IA_VISUAL_DIAGRAMS.md** — Visual structure

---

## CONTACTS

| Role | Name | Email | Phone |
|------|------|-------|-------|
| Project Lead | [Name] | [Email] | [Phone] |
| QA Lead | [Name] | [Email] | [Phone] |
| Deployment Lead | [Name] | [Email] | [Phone] |
| Brand Manager | [Name] | [Email] | [Phone] |
| Emergency Rollback | [Name] | [Email] | [Phone] |

---

## SIGN-OFF DATES

| Item | Date | Signature |
|------|------|-----------|
| Code Review Complete | [ ] | [ ] |
| QA Approval | [ ] | [ ] |
| Business Approval | [ ] | [ ] |
| Ready for Staging | [ ] | [ ] |
| Staging Tests Pass | [ ] | [ ] |
| Ready for Production | [ ] | [ ] |
| Deployed to Production | [ ] | [ ] |
| Post-Launch Verified | [ ] | [ ] |

---

## NOTES

[Space for any additional notes, concerns, or observations]

---

**Prepared By:** [Name]  
**Date:** April 20, 2026  
**Status:** READY FOR DEPLOYMENT ✅

**Next Steps:** Forward to QA lead for staging deployment