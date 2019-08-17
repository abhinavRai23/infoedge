import React from "react";
import "./styles/App.scss";
import Moment from "moment"
import "font-awesome/css/font-awesome.min.css";

const ProfileSection = props => {
	return (
		<div className="profile-section">
			<div className="container">
				<div className="row">
					<div className="col s6">
						<div className="name">{props.profile.name}</div>
						<div className="base-info">{props.profile.qualification} | {props.profile.exp}</div>
					</div>
					<div className="col s6">
						<div className="profile-pic">
							<img src={require(`./images/${props.profile.profile_pic}`)} alt="profile-pic" />
						</div>
					</div>
					<div className="col s12">
						<div className="search-wrapper">
							<input type="text" name="search" placeholder="Search Jobs" />
							<i className="fa fa-search" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const JobSection = props => {
	return (
		<div className="jobs-section">
			<div className="container">
				<div className="row">
					<div className="col s2">
						<div className="img-type">
							<img src={require(`./images/${props.data.icon}`)} alt="job-type" />
						</div>
					</div>
					<div className="col s8">
						<div className="job-type">{props.data.title}</div>
						<div className="more-info">
							{props.data.supportText} <a href="#">{props.data.type}</a>
						</div>
					</div>
					<div className="col s2">
						<div className="view-more">
							<a href="#">View</a>
						</div>
					</div>
				</div>
				{
					props.data.filters.length>0 &&
					<div className="flex-slider badges">
						{
							props.data.filters.map( (filter, i) => <div key={i}>{filter}</div> )
						}
					</div>
				}
			</div>
			<div className="flex-slider cards">
				{
					props.data.jobs.map( (job, index)=>
					<div key={index}>
						<div className="card">
							<div className="row">
								<div className="col s9">
									<div className="job-name">
										<div className="job-title">
											{job.title}
										</div>
										<div className="company-name">
											{job.company}
										</div>
									</div>
								</div>
								<div className="col s3">
									<div className="company-logo">
										<img src={require(`./images/${job.img || "icons/Company-default.svg"}`)} alt="logo" />
									</div>
								</div>
								<div className="col s12 job-details">
									<div className="location">
										<i className="fa fa-map-marker" /> {job.location}
									</div>
									<div className="compensation">
										<i className="fa fa-money" /> ₹ {job.compensation}
									</div>
									<div className="post-time">Posted {Moment().diff( job.jobPostingDate, 'days' )} days ago</div>
								</div>
							</div>
						</div>
					</div>
					)
				}
			</div>
		</div>
	);
};

const CategoryWiseFilter = props => {
	return (
		<div className="job-categories">
			<div className="title">Jobs by Categories</div>
			<div className="filter flex-slider">
				{
					props.categories.map((cat, index) => 
						<div key={index}>
							<div className="card">
								<div className="category-name">{cat.type}</div>
								<div className="no-of-jobs">{cat.count} Jobs</div>
							</div>
						</div>
					)
				}
			</div>
		</div>
	);
};

const WhatsAppCard = props => {
	return(
		<div className="container">
			<div className="card whatsapp">
				<div className="row">
					<div className="col s6">
						<div className="msg">
							Get alert on Whatsapp
						</div>
						<div className="support-text">
							For Similar Jobs
						</div>
						<div className="button">
							<a href="#" className="btn">Enable Now</a>
						</div>
					</div>
					<div className="col s6">
						<img src={require("./images/whatsapp-icon.png")}></img>
					</div>
				</div>
			</div>
		</div>
	)
}

const JobsCityWise = props => {
	return(
		<div className="city-section">
			<div className="container">
				<div className="row">
					<div className="col s2">
						<div className="img-type">
							<img src={require(`./images/icons/Jobs by Location.svg`)} alt="job-type" />
						</div>
					</div>
					<div className="col s7">
						<div className="job-type">Jobs by Cities</div>
					</div>
					<div className="col s3">
						<div className="view-more">
							<a href="#">View ALL</a>
						</div>
					</div>
				</div>
			</div>
			<div className="flex-slider">
				{
					props.data.map((city, i)=>
						<div key={i}>
							<div className="city-img">
								<img src={require(`./images/city_images/${city.name.toLowerCase()}.jpeg`)}></img>
							</div>
							<div className="info">
								<div className="name">
									{city.name}
								</div>
								<div className="job-count">
									{city.count} Jobs
								</div>
							</div>
						</div>
					)
				}
			</div>
		</div>
	)
}

const FixedFooter = props => {
	return(
		<div className="footer-fixed">
			<div className="active">
				<i className="fa fa-briefcase"></i>
				<div className="text">Jobs</div>
			</div>
			<div>
				<i className="fa fa-file-text-o"></i>
				<div className="text">Applies</div>
			</div>
			<div>
				<i className="fa fa-user-circle-o"></i>
				<div className="text">Profile</div>
			</div>
		</div>
	)
}

class App extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			profile: null,
			jobNearYou: null,
			jobsCategories: [],
			jobsForYou: null,
			cityWise: []
		}
	}
	componentDidMount(){
		// let {cityWise} = this.state
		// let d = 
		// cityWise = d.data

		this.setState({ 
			profile: require('./apis/profile.json'),
			cityWise: require('./apis/cityData.json').data,
			jobsCategories: require('./apis/jobCategories.json').data,
			jobNearYou: require("./apis/jobsNearYou.json"),
			jobsForYou: require("./apis/jobsForYou.json")
		})

	}
	render() {
		let { profile, jobNearYou, jobsCategories, jobsForYou, cityWise } = this.state
		return (
			<React.Fragment>
				{
					profile &&
						<ProfileSection profile={profile}/>
				}
				{
					jobNearYou && 
					<JobSection data={jobNearYou}/>
				}
				{
					jobsCategories.length!==0 &&
					<CategoryWiseFilter categories={jobsCategories}/>
				}
				{
					jobsForYou && 
					<JobSection data={jobsForYou}/>
				}
				<WhatsAppCard />
				{
					cityWise.length!==0 &&
						<JobsCityWise data={cityWise} />
				}
				<FixedFooter />
			</React.Fragment>
		);
	}
}

export default App;
