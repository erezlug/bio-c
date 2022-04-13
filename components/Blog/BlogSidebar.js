import React from 'react';

const BlogSidebar = () => {
    return (
        <div className="blog-details-item">
            <div className="blog-details-search">
                <form>
                    <input type="text" className="form-control" placeholder="Search" />
                    <button type="submit" className="btn blog-details-btn">
                        <i className="icofont-search-1"></i>
                    </button>
                </form>
            </div>

            <div className="blog-details-recent">
                <h3>Recent Blogs</h3>
                <ul>
                    <li>
                        <img src="https://biomarkerz-web.s3-us-west-1.amazonaws.com/blog1.jpg" alt="Recent" />
                        <a href="#">World AIDS Day, designated on 1 December.</a>
                        <ul>
                            <li>
                                <a href="#">
                                    <i className="icofont-businessman"></i> Admin
                                </a>
                            </li>
                            <li>
                                <i className="icofont-calendar"></i> Jan 03, 2020
                            </li>
                        </ul>
                    </li>
                    <li>
                        <img src="https://biomarkerz-web.s3-us-west-1.amazonaws.com/blog2.jpg" alt="Recent" />
                        <a href="#">World AIDS Day, designated on 1 December.</a>
                        <ul>
                            <li>
                                <a href="#">
                                    <i className="icofont-businessman"></i> Admin
                                </a>
                            </li>
                            <li>
                                <i className="icofont-calendar"></i> Jan 03, 2020
                            </li>
                        </ul>
                    </li>
                    <li>
                        <img src="https://biomarkerz-web.s3-us-west-1.amazonaws.com/blog3.jpg" alt="Recent" />
                        <a href="blog-details.html">World AIDS Day, designated on 1 December.</a>
                        <ul>
                            <li>
                                <a href="#">
                                    <i className="icofont-businessman"></i> Admin
                                </a>
                            </li>
                            <li>
                                <i className="icofont-calendar"></i> Jan 03, 2020
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div className="blog-details-category">
                <h3>Category</h3>
                <ul>
                    <li>
                        <a href="#">Health Care</a>
                    </li>
                    <li>
                        <a href="#">Medical science</a>
                    </li>
                    <li>
                        <a href="#">Daily lifestyle</a>
                    </li>
                    <li>
                        <a href="#">Medicine</a>
                    </li>
                    <li>
                        <a href="#">Mordern Technology</a>
                    </li>
                    <li>
                        <a href="#">Cancer Research</a>
                    </li>
                    <li>
                        <a href="#">BioInformatics</a>
                    </li>
                    <li>
                        <a href="#">Hospital Events</a>
                    </li>
                    <li>
                        <a href="#">Student Succses</a>
                    </li>
                </ul>
            </div>

            <div className="blog-details-tags">
                <h3>Tags</h3>
                <ul>
                    <li>
                        <a href="#">Dental</a>
                    </li>
                    <li>
                        <a href="#">Health</a>
                    </li>
                    <li>
                        <a href="#">Child</a>
                    </li>
                    <li>
                        <a href="#">Medicine</a>
                    </li>
                    <li>
                        <a href="#">Caveti</a>
                    </li>
                    <li>
                        <a href="#">AIDS</a>
                    </li>
                    <li>
                        <a href="#">Dental</a>
                    </li>
                    <li>
                        <a href="#">Health</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default BlogSidebar;