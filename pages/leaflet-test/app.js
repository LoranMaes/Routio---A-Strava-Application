/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// This example requires the Geometry library. Include the libraries=geometry
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=geometry">
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: { lat: 34.366, lng: -89.519 },
    });
    const enc_poly = "{hpuHuh{WhBLIpElSfB`G}MiD}DqKk@sJ_FwPaOsC_IuHkAgTsPuEqIiFgC{A\\mEzIgUiKuDtJeFhBmGtJkBXRoGiMm[^iLyGoFh@iI{H_JkBaPiNai@ao@i]gXgDiRq@mOlCuJuB_Cqe@ea@oXqToTkDcH}@aJkCwGyTo^{Q_K}GqIoIiAmEzIyT|PqBdIwGiKuF~AkNyCyD`Ci\\`Cp@fRgCdDeyA}cGeB{Mv@wUlb@obBt@iPsAePeZ}bA}q@ihBcnAevEyN_iA_DqIuDoD?sSoCeYsVlAmPrEoEeD}CiId@{GeBq@`N_eBcD_nCvAqBp@cM|Ea@xHkGrQyBh`@sW`OoTbk@e`@tN_FxPqT`XaTz\\el@`Cyc@cMmu@~BgNqGghA}JoGoAgEj|Ci}Br_@iTwZa|@mTajA{HsVwBsYaWeaAtMiJYoNhEpBjRcJlj@}@oDeIkGi\\eBav@bAwS{AiKkCeCcBmGGgm@kFeV?}Nr~@jQzk@aGvVyJxKgIlXpHjc@}Od[e`@hLeI`^_J`XqS`F]`@mCmDgJqAwQdDgFtDmNxP}XdIuWzQqU`Oqb@|A_Ki@wOgE}KBoE`CeBaI{wBiFvB~Ya]jBVdBeIbOiRzEeNbV}WlS_^nArChCFfEvHxOrg@pRaIlXqEjHkIjZdGpf@a_@zWq[rJqRlHyChJf`@~IzT`GnDnG~KnFiHrB~CnInB~DgC|]QbCyCpGpIbKb@xGdEhVpe@bCf]hEjWtOta@tPwOvCm[nEoG`DgLvIfAxQeFjJu@xDdChTyDrNuOtBaQnN}VxNy]dNsAtI`UfIvBSnLaFvMl@`HtXpp@`K~LdWvw@zr@leBnJlD~JmGnMBx_@rh@pHd\\bg@n`@dNbPnJlRuD`HqBr_@eNla@qLlw@kNrYiAdGdFrk@nFzU}RlWmZhWkH{OcObDcAeH}DfAdGn^~@~j@Yzb@sCx[dLfh@{GvRqHvHi@lEbCbUnKh_@jGjq@iE`LaI|FoCdH}EbBrAvJ~IhQ`@pPdk@fnDxa@|fA|b@f_AlEKnMtkAvGzR|CdVpx@bcCfP`a@zGpeAMbX_Mji@iEmE}Ix@uGkBqSfKiTVsZhWoWt[aZ{KmAjLoF`Bh@xOsb@vc@gJt@uHtEyBrE~JdKoA`DaInAaN|LsE`\\BnGhFhLjGbAvJrTdLfLqAjGd@vQkClF@rT{AlDv@nOcD~MLdUbBrOi@xM`ErBQfLsIHhI|^rRxV|Lps@rCxt@}LhXaH|hAzDzi@~Gnh@zBjG~KxJ}FnOiHr]Kr`@iGr^iDpJ}S|[fKl[jBthAg@|H{GxUcB|NL~J{RfDcFxPuJje@}C`ZsC~EgF|^y@f[uMff@iJx@_NkEiJxC_JW}MdLcVpHia@mCkViGwG`BiE{CeKNw@jHyI|@eIsCqAvWiOYeYhKw\\iLcFjGkDbMsJvKoEgj@mMGmGcFmh@xCwNqE_ElHaUnTyS|k@kNtt@iOdMkM~SaH~BkD_By_@ig@y[pAqVu^aKjCmBwFAoIeDkLoQaXwDfIaBsDkHsDoMs@b@hF"
  // const array = polyline.decode(enc_poly)
    const poly = new google.maps.Polyline({
      strokeColor: "#000000",
      strokeOpacity: 1,
      strokeWeight: 3,
      map: map,
      path: google.maps.geometry.encoding.decodePath(enc_poly)
    });
    var bounds = new google.maps.LatLngBounds();
    for (var i=0; i<poly.getPath().getLength(); i++) {
      bounds.extend(poly.getPath().getAt(i));
    }
    map.addListener('zoom_changed', function() {
      console.log("zoom="+map.getZoom())
    });
    map.addListener('center_changed', function() {
      console.log("center="+map.getCenter())
    });
    map.fitBounds(bounds);
  
  let url = 'https://maps.googleapis.com/maps/api/staticmap?size=400x400&center=50.87026,4.32588&zoom=10&key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&path=weight:3%7Ccolor:blue%7Cenc:'+enc_poly;
  // center=(50.87026265348288, 4.325880000000026)
  // zoom=9
  const element = document.createElement("img")
  element.src = url
  
  const main = document.querySelector("#sidebar")
  main.appendChild(element)
  }
  window.initMap = initMap;
  