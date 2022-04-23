import {ApolloServer} from "apollo-server";

interface playlist{
  idPlaylist: number,
  idChannel: number,
  description: string,
}

interface channel{
  idChannel: number,
  name: string,
}

interface video{
  idVideo: number,
  idPlaylist: number,
  title: string,
}

const typeDefs = `
    type Channel{
      idChannel: Int
      name: String
      playlists: [Playlist]
    }

    type Playlist{
      idPlaylist: Int
      idChannel: Int
      description: String
      videos: [Video]
    }

    type Video {
      idVideo: Int
      idPlaylist: Int
      title: String
    }

    type Query{
      channels(idChannel: Int): [Channel]
    }

    input ChannelInput{
      idChannel: Int
      name: String
    }

    type Mutation{
      saveChannel(channel: ChannelInput!): Channel
    }
`;

const channels: channel[] = [
  {idChannel: 1, name: "Yan Santana",},
  {idChannel: 2, name: "Outro canal",},
]

const playlists: playlist[] = [
  {idPlaylist: 1, idChannel: 1, description: "Playlist 1"},
  {idPlaylist: 2, idChannel: 1, description: "Playlist 2"},
  {idPlaylist: 3, idChannel: 2, description: "Playlist 3"},
]

const videos: video[] = [
  {idVideo: 1, idPlaylist: 1, title: "Video 1"},
  {idVideo: 2, idPlaylist: 1, title: "Video 2"},
  {idVideo: 3, idPlaylist: 2, title: "Video 3"},
]

const resolvers = {
  Query: {
    channels(obj, args){
        return channels.filter(channel => !args.idChannel || channel.idChannel === args.idChannel)
    }
  },
  Mutation:{
    saveChannel(obj, args){
      const channel = args.channel
      channels.push(channel)
      return channel
    }
  },
  Channel: {
    playlists(obj: channel, args){
      const idChannel = obj.idChannel;
      return playlists.filter(playlist => playlist.idChannel === idChannel)
    }
  },
  Playlist: {
    videos(obj: playlist, args){
      const idPlaylist = obj.idPlaylist;
      return videos.filter(video => video.idPlaylist === idPlaylist)
    }
  }
};



const server = new ApolloServer({typeDefs, resolvers});
server.listen(4000)