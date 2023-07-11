<#macro clinNavigation>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #095797;color: #ffffff;">
            <img class="navbar-brand" src="${url.resourcesPath}/img/logos/cqgc-white.svg" style="height: 2.65rem">

            <#if realm.internationalizationEnabled  && locale.supported?size gt 1>
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item dropdown" style="color: #aec8dd;">
                        <a class="nav-link dropdown d-flex" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color: #aec8dd;">
                            <i fill="currentColor">
                                <svg fill="currentColor" height="16" width="16" viewBox="0 0 24 24" style="width: 1.2rem; height: 1.2rem">
                                    <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"></path>
                                </svg>
                            </i>
                            <span class="sr-only">Change language</span>
                            <span class="p-1 align-self-center lang-change">${locale.current[0..1]}</span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <#list locale.supported as l>
                                <a class="dropdown-item" href="${l.url}">${l.label}</a>
                            </#list>
                        </div>
                    </li>
                </ul>
            </#if>
        </nav>
    </header>
</#macro>

<#macro clinPartners>
    <img class="cqgc-color-logo" src="${url.resourcesPath}/img/logos/cqgc-color.svg" />
    <div class="lead">
        ${msg("login.partners.lead")}
    </div>

    <div class="partenaire pt-2">
        <div class="partner-img"><img height="42" alt="${msg("login.partner.chust")}" src="${url.resourcesPath}/img/logos/chujs-color.svg"></div>
        <div class="partner-img"><img height="75" alt="${msg("login.partner.chum")}" src="${url.resourcesPath}/img/chum.png"></div>
        <div class="partner-img"><img height="40" alt="${msg("login.partner.jewish")}" src="${url.resourcesPath}/img/logos/hgj.svg"></div>
        <div class="partner-img"><img height="60" alt="${msg("login.partner.chuq")}" src="${url.resourcesPath}/img/chu.png"></div>
        <div class="partner-img"><img height="30" alt="${msg("login.partner.cardio")}" src="${url.resourcesPath}/img/icm.png"></div>
        <div class="partner-img"><img height="45" alt="${msg("login.partner.chus")}" src="${url.resourcesPath}/img/chus.gif"></div>
        <div class="partner-img"><img height="35" alt="${msg("login.partner.hmr")}" src="${url.resourcesPath}/img/hmr.gif"></div>
        <div class="partner-img"><img height="20" alt="${msg("login.partner.mcgill")}" src="${url.resourcesPath}/img/logos/mcgill.svg"></div>
        <div class="partner-img"><img height="29" alt="${msg("login.partner.msssq")}" src="${url.resourcesPath}/img/logos/msssq.svg"></div>
    </div>
</#macro>

<#macro clinFooter>
    <section>
        <div class="footer-clean">
            <div class="pt-4 pb-4" style="background-color: #125A90;">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-sm-6 col-md-4 item" style="color: #ffffff;">
                            <h3>${msg("login.footer.info-and-services")}</h3>
                            <ul>
                                <li><a href="#">${msg("login.footer.info-and-services.documentation")}</a></li>
                                <li><a href="#">${msg("login.footer.info-and-services.faq")}</a></li>
                                <li>
                                    <a href="#">${msg("login.footer.info-and-services.services")}</a>
                                    <span>
                                        <svg fill="currentColor" height="16" width="16" viewBox="0 0 24 24" style="width: 16px; height: 16px">
                                            <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path>
                                        </svg>
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div class="col-sm-6 col-md-5 item" style="color: #ffffff;">
                            <h3>${msg("login.footer.contact-us")}</h3>
                            <ul>
                                <li>
                                    <span>
                                        <svg fill="currentColor" height="16" width="16" viewBox="0 0 24 24" style="width: 16px; height: 16px">
                                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path>
                                        </svg>
                                    </span>
                                    <a href="#">${msg("login.footer.contact-us.phone")}</a>
                                </li>
                                <li>
                                    <span>
                                        <svg fill="currentColor" height="16" width="16" viewBox="0 0 24 24" style="width: 16px; height: 16px">
                                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
                                      </svg>
                                    </span>
                                    <a href="#">${msg("login.footer.contact-us.email")}</a>
                                </li>
                                <li>
                                    <span>
                                        <svg fill="currentColor" height="16" width="16" viewBox="0 0 24 24" style="width: 16px; height: 16px">
                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
                                        </svg>
                                    </span>
                                    <a href="#">${msg("login.footer.contact-us.address")}</a>
                                </li>
                            </ul>
                        </div>
                        <div class="col-sm-0 col-md-3 d-none d-md-block align-self-center align-middle item social" style="color: #ffffff;">
                            <img style="height: 70px" src="${url.resourcesPath}/img/logos/chujs-white.svg">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-basic pt-3">
            <div class="container">
                <div class="row justify-content-center align-items-center">
                    <div class="col-sm-12 col-md-8">
                        <ul class="list-inline text-left" style="font-size: 13px;">
                            <li class="list-inline-item"><a href="#">${msg("login.footer.accessibility")}</a></li>
                            <li class="list-inline-item"><a href="#">${msg("login.footer.access")}</a></li>
                            <li class="list-inline-item"><a href="#">${msg("login.footer.privacy")}</a></li>
                            <li class="list-inline-item"><a href="#">${msg("login.footer.about")}</a></li>
                            <li class="list-inline-item"></li>
                        </ul>
                    </div>
                    <div class="col-sm-0 col-md-4 d-none d-md-block text-right"><img src="${url.resourcesPath}/img/logos/msssq.svg"></div>
                </div>
            </div>
        </div>
    </section>
</#macro>

<#macro clinFooterScripts>
    <script src="${url.resourcesPath}/js/jquery-3.5.1.slim.min.js"></script>
    <script src="${url.resourcesPath}/js/popper-1.16.0.min.js"></script>
    <script src="${url.resourcesPath}/js/bootstrap-4.5.0.min.js"></script>
    <script>
      $('#date').html((new Date()).getFullYear())
    </script>
</#macro>
