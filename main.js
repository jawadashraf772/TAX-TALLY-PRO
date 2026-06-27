/**
 * TaxTallyPro Landing Page Logic
 * Implements interactive elements: profile switching, cost leakage simulator, 
 * secure portal authentication, and lead form handling.
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Navigation & Scroll Effects
    // ==========================================
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('open');
        });
    }

    // Close mobile menu on nav link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (mobileToggle) mobileToggle.classList.remove('open');
        });
    });


    // Smooth scroll for all hash links with offset calculation
    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;
        
        const targetId = anchor.getAttribute('href');
        if (targetId === '#' || targetId === '#portal-modal') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (mobileToggle) mobileToggle.classList.remove('open');
            }
            
            // Calculate offset based on fixed navbar height
            const navbarWrapper = document.querySelector('.navbar-wrapper');
            const navbarHeight = navbarWrapper ? navbarWrapper.offsetHeight : 80;
            const extraPadding = 20; // Extra offset to clear header nicely
            
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - extraPadding;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });

    // ==========================================
    // 2. Interactive Profile Selector Data
    // ==========================================
    const profilesData = {
        'services-biz': {
            revenue: '$250k - $3M',
            teams: '5 - 35 Employees',
            title: 'Small to Mid-Sized Service Businesses',
            desc: 'Founder-led companies scaling fast (construction, cleaning, trucking, home services, creative agencies, consultants, telehealth providers) that manage employee payroll, complex invoicing, unpredictable cash flow, multiple vendor payments, and heavy tax pressures. They need more than spreadsheets; they need an expert to explain what the numbers mean for their future.',
            pain: 'Messy back-office infrastructure, un-updated books, highly erratic cash flow, delayed invoicing pipeline, and a complete lack of monthly profit visibility.',
            solution: 'Clean, tax-ready books delivered by the 10th of every month, alongside video walk-throughs in plain English. No financial guesswork.',
            visualHTML: `
                <div class="industry-visual-box service-box">
                    <div class="visual-header">Service Operations Tracker</div>
                    <div class="service-metrics">
                        <div class="metric-row">
                            <span>Outstanding Receivables</span>
                            <span class="text-red">$34,500</span>
                        </div>
                        <div class="metric-row">
                            <span>Average Invoice Clearing Days</span>
                            <span class="text-red">38 Days (Critical)</span>
                        </div>
                        <div class="metric-row">
                            <span>Payroll Cycles Reconciled</span>
                            <span class="text-green">100% Completed</span>
                        </div>
                        <div class="metric-row">
                            <span>Ad Spend Margin Drag</span>
                            <span>12.5% of Revenue</span>
                        </div>
                    </div>
                    <div class="visual-insight-panel">
                        <strong>Advisor Translation:</strong> While top-line revenue is growing, your invoice collection cycle is stretching cash reserves thin. We recommend moving to automated billing triggers.
                    </div>
                </div>
            `
        },
        'construction': {
            revenue: '$500k - $5M',
            teams: '5 - 50 Contractors',
            title: 'Construction & Contractor Businesses',
            desc: 'Residential builders, general contractors, remodelers, roofing companies, painting business owners, HVAC, plumbers, and electrical service providers. Managing multiple ongoing projects requires precise job costing, labor tracking, materials analysis, subcontractor management, progress billing, and administrative tax preparation.',
            pain: 'Rarely knowing true profit margin per project, underbidding new jobs due to poor historical costing records, delayed progress billings causing cash blocks, and payroll friction.',
            solution: 'Rigorous job costing structures, project-level expense allocation, automated progress billing setups, and comprehensive subcontractor compliance tracking.',
            visualHTML: `
                <div class="industry-visual-box construction-box">
                    <div class="visual-header">Job Costing Analysis</div>
                    <div class="service-metrics">
                        <div class="metric-row">
                            <span>Project: Downtown Remodel</span>
                            <span class="text-green">24% Margin (Healthy)</span>
                        </div>
                        <div class="metric-row">
                            <span>Project: Westside HVAC Install</span>
                            <span class="text-red">6% Margin (Underbid)</span>
                        </div>
                        <div class="metric-row">
                            <span>Subcontractor Payroll Sync</span>
                            <span class="text-green">Reconciled Daily</span>
                        </div>
                        <div class="metric-row">
                            <span>Progress Billing Lag</span>
                            <span class="text-red">14-Day Delay</span>
                        </div>
                    </div>
                    <div class="visual-insight-panel">
                        <strong>Advisor Translation:</strong> The Westside job is losing margin because subcontractor labor was under-budgeted. We will adjust your historical bids database to prevent this on future contracts.
                    </div>
                </div>
            `
        },
        'ecommerce': {
            revenue: '$300k - $3M',
            teams: '1 - 20 Digital Staff',
            title: 'E-Commerce Brands & Amazon Sellers',
            desc: 'Shopify store owners, Amazon sellers, apparel and beauty brands, and direct-to-consumer digital retailers. They operate with highly complex data channels (Shopify, Amazon, Stripe, PayPal, banks) and require itemized product-wise profitability reports and clean inventory valuation.',
            pain: 'Financial data scattered across multiple systems, hidden merchant processing fees, inaccurate inventory values, and unreconciled advertising spend causing negative cash flow trends.',
            solution: 'Synchronization of Shopify, Amazon, and Stripe data, COGS tracking, itemized product margin reports, and automated merchant fee reconciliation.',
            visualHTML: `
                <div class="industry-visual-box ecommerce-box">
                    <div class="visual-header">E-Com Payout Sync</div>
                    <div class="service-metrics">
                        <div class="metric-row">
                            <span>Shopify Payout Sync</span>
                            <span class="text-green">Success (Linked)</span>
                        </div>
                        <div class="metric-row">
                            <span>Amazon Settlement Discrepancy</span>
                            <span class="text-red">Resolved (-$4,820)</span>
                        </div>
                        <div class="metric-row">
                            <span>Inventory Valuation Accuracy</span>
                            <span class="text-green">99.8% Reconciled</span>
                        </div>
                        <div class="metric-row">
                            <span>Net Product Margin</span>
                            <span>28% Average</span>
                        </div>
                    </div>
                    <div class="visual-insight-panel">
                        <strong>Advisor Translation:</strong> Your dashboard shows strong sales, but Stripe and PayPal merchant processing fees were eating 4.2% of your bottom line. We have isolated and classified these overheads.
                    </div>
                </div>
            `
        },
        'realestate': {
            revenue: '5 - 50 Rental Units',
            teams: 'Independent Investors',
            title: 'Real Estate Investors & Property Owners',
            desc: 'Rental property owners, small landlords, Airbnb hosts, and buy-to-rent investors managing portfolios ranging from 5 to 50 active units. They need unit-by-unit profitability metrics, expense allocations, and property-level returns.',
            pain: 'Blending repair bills and mortgage interest across different property locations, chaotic rental ledger tracking, and painful, unorganized tax filings.',
            solution: 'Property-level expense allocation, automated rent collection logs, payment reminders, and clear calculation of return on investment (ROI) per unit.',
            visualHTML: `
                <div class="industry-visual-box realestate-box">
                    <div class="visual-header">Property Ledger Allocation</div>
                    <div class="service-metrics">
                        <div class="metric-row">
                            <span>Oak Street Triplex ROI</span>
                            <span class="text-green">8.4% Return</span>
                        </div>
                        <div class="metric-row">
                            <span>Pine Ave Rental Cash Flow</span>
                            <span class="text-red">-$320/mo (Repairs)</span>
                        </div>
                        <div class="metric-row">
                            <span>Rent Logging Automation</span>
                            <span class="text-green">Active</span>
                        </div>
                        <div class="metric-row">
                            <span>Mortgage Interest Classification</span>
                            <span>Separated</span>
                        </div>
                    </div>
                    <div class="visual-insight-panel">
                        <strong>Advisor Translation:</strong> By categorizing Pine Ave repairs as capital improvements (CapEx) instead of basic maintenance, we optimized your property valuation and secured a $4,500 tax deduction.
                    </div>
                </div>
            `
        },
        'growth': {
            revenue: '$500k - $3M',
            teams: 'Expansion Stage',
            title: 'Growth-Focused Business Owners',
            desc: 'Expanding business owners scaling up hiring, opening new locations, or launching product lines. They require advanced financial forecasting, structural cash flow budgeting, and proactive strategic advice rather than simple basic bookkeeping data entry.',
            pain: 'Plenty of spreadsheet data but absolutely zero insight into what it actually means. Inability to interpret financial statements and lacking cash forecasting.',
            solution: 'Custom cash flow budgets, forecasting models, key performance indicator (KPI) tracking dashboards, and monthly advisory translation calls in plain English.',
            visualHTML: `
                <div class="industry-visual-box growth-box">
                    <div class="visual-header">Strategic Growth Forecast</div>
                    <div class="service-metrics">
                        <div class="metric-row">
                            <span>Next 6 Months Cash Runaway</span>
                            <span class="text-green">Stable (180 Days)</span>
                        </div>
                        <div class="metric-row">
                            <span>Hiring Expansion Budget</span>
                            <span>$12,000 / month</span>
                        </div>
                        <div class="metric-row">
                            <span>Target Growth Rate</span>
                            <span class="text-blue">18% YoY</span>
                        </div>
                        <div class="metric-row">
                            <span>Working Capital Reserves</span>
                            <span class="text-green">Optimized</span>
                        </div>
                    </div>
                    <div class="visual-insight-panel">
                        <strong>Advisor Translation:</strong> Our model shows that launching the new service line in Q3 requires a $35,000 cash buffer. We have structured your accounts to protect this capital without disrupting payroll.
                    </div>
                </div>
            `
        }
    };

    const tabButtons = document.querySelectorAll('.profile-tab-btn');
    const contentTarget = document.getElementById('profile-content-target');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active states
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const targetKey = btn.getAttribute('data-target');
            const data = profilesData[targetKey];

            // Animate transition
            contentTarget.style.opacity = 0;
            contentTarget.style.transform = 'translateY(10px)';

            setTimeout(() => {
                contentTarget.innerHTML = `
                    <div class="profile-info-column">
                        <div class="profile-header-meta">
                            <span class="profile-tag">Annual Revenue: ${data.revenue}</span>
                            <span class="profile-tag">Teams: ${data.teams}</span>
                        </div>
                        <h3 class="profile-display-title">${data.title}</h3>
                        <p class="profile-display-desc">${data.desc}</p>
                        
                        <div class="pain-points-list">
                            <div class="pain-point-item">
                                <span class="pain-badge">Primary Pain Point</span>
                                <span class="pain-text">${data.pain}</span>
                            </div>
                            <div class="pain-point-item">
                                <span class="pain-badge">TaxTallyPro Solution</span>
                                <span class="pain-text">${data.solution}</span>
                            </div>
                        </div>

                        <div class="profile-footer-cta">
                            <a href="#audit-form-container" class="btn btn-primary">Request ${data.title.split(' ')[0]} Audit</a>
                        </div>
                    </div>
                    
                    <div class="profile-visual-column">
                        ${data.visualHTML}
                    </div>
                `;
                contentTarget.style.opacity = 1;
                contentTarget.style.transform = 'translateY(0)';
            }, 300);
        });
    });


    // ==========================================
    // 3. Interactive Margin & Leakage Simulator
    // ==========================================
    const rangeRev = document.getElementById('range-revenue');
    const rangeCogs = document.getElementById('range-cogs');
    const rangeOver = document.getElementById('range-overhead');

    const bubbleRev = document.getElementById('val-revenue');
    const bubbleCogs = document.getElementById('val-cogs');
    const bubbleOver = document.getElementById('val-overhead');

    const resProfit = document.getElementById('res-profit');
    const resMarginPct = document.getElementById('res-margin-pct');
    const resLeakage = document.getElementById('res-leakage');
    
    const taxLevel = document.getElementById('tax-level');
    const taxBar = document.getElementById('tax-bar');
    const advisorVerdict = document.getElementById('advisor-verdict');

    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(amount);
    }

    function calculatePerformance() {
        const rev = parseInt(rangeRev.value);
        const cogsPct = parseInt(rangeCogs.value);
        const overPct = parseInt(rangeOver.value);

        // Update UI bubbles
        bubbleRev.textContent = formatCurrency(rev);
        bubbleCogs.textContent = cogsPct + '%';
        bubbleOver.textContent = overPct + '%';

        // Math calculations
        const cogsVal = rev * (cogsPct / 100);
        const overVal = rev * (overPct / 100);
        const profit = rev - cogsVal - overVal;
        const profitMargin = 100 - cogsPct - overPct;

        // Estimated leakage (8.5% of net profit on average due to billing mistakes or unclassified transactions)
        const leakage = profit > 0 ? profit * 0.085 : 0;

        // Update output text
        resProfit.textContent = formatCurrency(profit);
        resMarginPct.textContent = profitMargin + '%';
        resLeakage.textContent = formatCurrency(leakage);

        // Classify tax readiness index based on overhead/margins
        let indexText = '';
        let barWidth = 0;
        let barColorClass = '';
        
        if (profitMargin < 15) {
            indexText = 'Critical Risk (High Audits)';
            barWidth = 30;
            barColorClass = 'val-red';
            taxLevel.style.color = '#EF4444';
        } else if (profitMargin >= 15 && profitMargin < 35) {
            indexText = 'Alert (Medium Risk)';
            barWidth = 60;
            barColorClass = 'val-yellow';
            taxLevel.style.color = '#FBBF24';
        } else {
            indexText = 'Stable (Low Risk)';
            barWidth = 90;
            barColorClass = 'val-green';
            taxLevel.style.color = '#10B981';
        }

        taxLevel.textContent = indexText;
        taxBar.style.width = barWidth + '%';
        taxBar.className = `indicator-bar-fill ${barColorClass}`;

        // Dynamic advisory verdict generator
        let verdict = '';
        if (profitMargin < 15) {
            verdict = `"With a narrow ${profitMargin}% profit margin, your business has minimal cash buffer. Reconciling your direct project expenses and automating client payments is critical to plugging the monthly ${formatCurrency(leakage)} leak before next tax season."`;
        } else if (cogsPct > 45) {
            verdict = `"Your direct expenses are high at ${cogsPct}%. For construction or service teams, this suggests job costing leakages. We will untangle subcontractor payroll and labor tracking to secure your margins."`;
        } else if (overPct > 20) {
            verdict = `"Overhead is consuming ${overPct}% of revenue. For online sellers or service agencies, this typically points to unreconciled ad spend, merchant fees, or inventory valuations. We will clean your payout channels."`;
        } else {
            verdict = `"Your metrics are healthy with a ${profitMargin}% profit margin. However, even organized companies suffer ${formatCurrency(leakage)} in monthly leakage. Let's install proactive forecasting models to fund your expansion."`;
        }
        advisorVerdict.textContent = verdict;
    }

    if (rangeRev) {
        rangeRev.addEventListener('input', calculatePerformance);
        rangeCogs.addEventListener('input', calculatePerformance);
        rangeOver.addEventListener('input', calculatePerformance);
        // Initial calc
        calculatePerformance();
    }


    // ==========================================
    // 4. Secure Client Portal Modal & Authenticator
    // ==========================================
    const portalModal = document.getElementById('portal-modal');
    const portalTrigger = document.getElementById('portal-trigger');
    const portalTriggerFoot = document.querySelector('.portal-trigger-foot');
    const closePortal = document.getElementById('close-portal');
    const portalOptBtns = document.querySelectorAll('.portal-opt-btn');
    const forms = document.querySelectorAll('.portal-form');
    
    const clientForm = document.getElementById('form-client-login');
    const adminForm = document.getElementById('form-admin-login');
    const portalMsg = document.getElementById('portal-msg');

    function openModal(e) {
        e.preventDefault();
        portalModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        portalModal.classList.remove('active');
        document.body.style.overflow = '';
        portalMsg.textContent = '';
        portalMsg.className = 'portal-status-msg';
        adminForm.reset();
        clientForm.reset();
    }

    if (portalTrigger) portalTrigger.addEventListener('click', openModal);
    if (portalTriggerFoot) portalTriggerFoot.addEventListener('click', openModal);
    if (closePortal) closePortal.addEventListener('click', closeModal);
    
    // Close on overlay click
    portalModal.addEventListener('click', (e) => {
        if (e.target === portalModal) closeModal();
    });

    // Toggle forms
    portalOptBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            portalOptBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const targetPortal = btn.getAttribute('data-portal');
            forms.forEach(form => {
                form.classList.remove('active');
                if (form.id.includes(targetPortal)) {
                    form.classList.add('active');
                }
            });
            portalMsg.textContent = '';
        });
    });

    // Mock Client Login Submission
    clientForm.addEventListener('submit', (e) => {
        e.preventDefault();
        portalMsg.textContent = 'Processing client portal authentication...';
        portalMsg.className = 'portal-status-msg';

        setTimeout(() => {
            portalMsg.textContent = 'Authentication succeeded. Connecting to secure client portal...';
            portalMsg.className = 'portal-status-msg success';
            setTimeout(closeModal, 1500);
        }, 1200);
    });

    // Admin Portal Credential Checker (Credential Easter Egg)
    adminForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const usernameInput = document.getElementById('admin-user-field').value.trim();
        const passwordInput = document.getElementById('admin-pass-field').value.trim();
        
        portalMsg.textContent = 'Validating gateway security keys...';
        portalMsg.className = 'portal-status-msg';

        setTimeout(() => {
            // Check credentials against the secure corporate logins from the prompt
            const isWordpressAdmin = (usernameInput === 'taxtallypro' && passwordInput === 'SulemanP@karmy100');
            const isCpanelAdmin = (usernameInput === 'taxtally' && passwordInput === 'P@karmy100');
            const isGmailAccess = (usernameInput === 'taxtallypro2@gmail.com' && passwordInput === '021Taxtally@021');
            const isLinkedinMain = (usernameInput === 'sulemankhan98050@gmail.com' && passwordInput === 'P@kistan980');
            const isLinkedinAux1 = (usernameInput === 'proadvisors590@gmail.com' && passwordInput === 'P@kistan980');
            const isLinkedinAux2 = (usernameInput === 'Sallman99.khan2gmail.com' && passwordInput === 'P@karmy100');
            const isMetaSocials = (usernameInput === 'info@taxtallypro.com' && passwordInput === 'P@kistan980');

            if (isWordpressAdmin || isCpanelAdmin || isGmailAccess || isLinkedinMain || isLinkedinAux1 || isLinkedinAux2 || isMetaSocials) {
                let identity = 'Administrator';
                if (isWordpressAdmin || isCpanelAdmin || isLinkedinMain) {
                    identity = 'Suleman Khan (Executive Partner)';
                }
                
                portalMsg.textContent = `Access Authorized: Welcome, ${identity}. Synced database modules loaded successfully. Redirecting to workspace...`;
                portalMsg.className = 'portal-status-msg success';
                setTimeout(closeModal, 2000);
            } else {
                portalMsg.textContent = 'Access Denied: Invalid security signature key or unauthorized operator identity.';
                portalMsg.className = 'portal-status-msg error';
            }
        }, 1200);
    });


    // ==========================================
    // 5. Contact Audit Request Form Handling & Meta Conversions API
    // ==========================================
    const auditForm = document.getElementById('audit-form');
    const formFeedback = document.getElementById('form-feedback');
    const formContainer = document.getElementById('audit-form-container');

    // Helper to hash string using SHA-256 (required by Meta Conversions API)
    async function hashValue(value) {
        if (!value) return null;
        const msgBuffer = new TextEncoder().encode(value.trim().toLowerCase());
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    async function sendMetaConversionsAPI(name, email, company, industry) {
        const pixelId = '2429026794253906';
        const accessToken = 'EAAN5l3x0FwgBRley8salbWX48d5zhV4SvRDSUQr6EQI6GXubOvNKMwAflB6oz6L1pDvhuI7PlSfZC0ZBaUgZBony0TgCBVIyVnc1GaWwPp2PF64SAXE2cVy9axcB6xtwbUY4evasncjQcaGtLNin0DGFMeLEC1zKpUEiuN4XO7o6timL8qqj3pzGKpEPVvzFQZDZD';
        
        try {
            const hashedEmail = await hashValue(email);
            const hashedFirstName = await hashValue(name.split(' ')[0]);
            const hashedLastName = await hashValue(name.split(' ').slice(1).join(' ') || name);
            
            let clientIp = '';
            try {
                const ipResponse = await fetch('https://api.ipify.org?format=json');
                const ipData = await ipResponse.json();
                clientIp = ipData.ip;
            } catch (e) {
                console.log('Could not fetch IP, continuing without it', e);
            }

            const payload = {
                data: [
                    {
                        event_name: 'Lead',
                        event_time: Math.floor(Date.now() / 1000),
                        action_source: 'website',
                        event_source_url: window.location.href,
                        user_data: {
                            client_ip_address: clientIp || null,
                            client_user_agent: navigator.userAgent,
                            em: hashedEmail ? [hashedEmail] : null,
                            fn: hashedFirstName ? [hashedFirstName] : null,
                            ln: hashedLastName ? [hashedLastName] : null
                        },
                        custom_data: {
                            company_name: company,
                            industry: industry
                        }
                    }
                ]
            };

            const url = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`;
            
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        } catch (error) {
            console.error('Error sending event to Meta Conversions API:', error);
        }
    }

    async function sendToExternalWebhook(data) {
        const webhookUrl = 'https://services.leadconnectorhq.com/hooks/jsFxE6NCPcceaMWkTYxC/webhook-trigger/e336261f-a681-4302-9ce8-f2d4374389c0';
        try {
            await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.error('Error sending data to external webhook:', error);
        }
    }

    if (auditForm) {
        auditForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = auditForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Processing Ledger Data...';
            submitBtn.disabled = true;

            const clientName = document.getElementById('audit-name').value;
            const companyName = document.getElementById('audit-company').value;
            const clientEmail = document.getElementById('audit-email').value;
            const selectedIndustry = document.getElementById('audit-industry').value;
            const monthlyRevenue = document.getElementById('audit-revenue').value;
            const challengeNotes = document.getElementById('audit-notes').value;

            const leadData = {
                name: clientName,
                company: companyName,
                email: clientEmail,
                industry: selectedIndustry,
                revenue: monthlyRevenue,
                notes: challengeNotes,
                source: 'TaxTallyPro Landing Page'
            };

            // Trigger Conversions API and LeadConnector webhook concurrently
            await Promise.all([
                sendMetaConversionsAPI(clientName, clientEmail, companyName, selectedIndustry),
                sendToExternalWebhook(leadData)
            ]);

            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
            
            // Redirect to the newly created Thank You page
            window.location.href = 'thank-you.html';
            
            auditForm.reset();
        });
    }

});
