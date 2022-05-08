export const dbConnection = async (mongoose, mongoURI) => {
    try { await mongoose.connect(mongoURI) } 
    catch { process.exit(1) }
}